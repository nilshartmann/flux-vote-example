// --------------------------------------------------------------------------------------
// ---
// ---
// ---
// --------------------------------------------------------------------------------------
// --- Copyright (c) 2015 Nils Hartmann (http://nilshartmann.net).
// -------------------------------------------------------------------------------------
"use strict";

const votetest = require('../index'),
	expect = votetest.expect,
	Backend = votetest.Backend,
	VoteStore = votetest.VoteStore,
	VotingStore = votetest.VotingStore,
	VoteListActionsCreator = votetest.VoteListActionsCreator,
	VotingActionsCreator = votetest.VotingActionsCreator,
	VoteComposerActionsCreator = votetest.VoteComposerActionsCreator,
	Bootstrap = votetest.Bootstrap,
	FetchUtil = votetest.FetchUtil,
	sinon = votetest.sinon;

/**
 * Bootstraps a running test server and redirect the fetch API calls to this server. Cleans up
 * everything afterwards
 */
class TestEnvironment {
	setup(done) {
		this.stubs = [];

		const self = this;
		this.testData = votetest.createUnitTestData();
		Bootstrap.bootstrap(this.testData, 6666, function (runningServer) {
			self.voteServer = runningServer;

			// Prepare stubs
			self.stubs.push(TestEnvironment._prepareStub('get', runningServer));
			self.stubs.push(TestEnvironment._prepareStub('post', runningServer));

			done();
		});
	}

	static _prepareStub(method, server) {
		return sinon.stub(FetchUtil, method.toLocaleLowerCase() + 'Json', function (path, obj, cb) {
			if (!cb) {
				cb = obj;
			}
			const options = {
				method: method.toLocaleUpperCase(),
				payload: obj,
				url:    path
			};
			console.log("## options: ##", options);
			server.inject(options, function (response) {
				cb(response.result);
			});
		});
	}

	dispose(done) {
		for (let stub of this.stubs) {
			stub.restore();
		}
		if (this.voteServer) {
			console.log("Stopping server");
			this.voteServer.stop(done);
		} else {
			done();
		}
	}
}

describe('Data Flow with Server', function () {

	var testEnvironment;

	// make sure 'done' is called even when a chai assertion failed
	function check(done, fn) {
		try {
			fn();
			done();
		} catch (err) {
			done(err);
		}
	}

	beforeEach(function (done) {
		testEnvironment = new TestEnvironment();
		testEnvironment.setup(done);
	});

	afterEach(function (done) {
		testEnvironment.dispose(done);
	});

	function checkStore(done, store, checker) {
		function listener() {
			console.log();
			try {
				checker();
				store.removeChangeListener(listener);
				done();
			} catch (err) {
				done(err);
			}
		}

		store.addChangeListener(listener);
	}

	it('received votes from backend should end up in VoteStore', function (done) {
		// Trigger action...
		Backend.getAllVotes();

		// verify (since processing is async, we'll have to wait until the listener is notified)
		checkStore(done, VoteStore, function () {
			const allVotes = VoteStore.getAllVotes();
			expect(allVotes).to.be.an('array');
			expect(allVotes).to.have.length(3);
			expect(allVotes[0].id).to.be.equal('vote_1');
		});
	});

	it('should pass current vote received from backend to VotingStore', function (done) {
		// Trigger
		const vote = testEnvironment.testData[1];
		VoteListActionsCreator.selectVote(vote);

		const currentVote = VotingStore.getCurrentVote();
		expect(currentVote).to.be.ok;
		expect(currentVote.id).to.be.equal('vote_2');
		expect(currentVote.choices).to.be.an('array');
		expect(currentVote.choices[0].percent).to.be.at.least(1);

		done();
	});

	it('should increment vote count and pass to VotingStore', function (done) {
		// Trigger
		VotingActionsCreator.vote('vote_3', 'choice_5');

		// Verify
		checkStore(done, VotingStore, function () {
			const currentVote = VotingStore.getCurrentVote();
			expect(currentVote).to.be.ok;
			expect(currentVote.id).to.be.equal('vote_3');
			expect(currentVote.choices).to.be.an('array');
			expect(currentVote.choices[4].voteCount).to.be.equal(801);
		});
	});

	it('should add new votes', function (done) {
		const newRawVote = {
			title:       'How do you like our service',
			description: 'Please give us a feedback',
			choices:     [
				{
					id:    'f1',
					title: 'Awesome'
				},
				{
					id:    'f2',
					title: 'Poor'
				}
			]
		};

		VoteComposerActionsCreator.addVote(newRawVote);

		// Verify
		checkStore(done, VoteStore, function () {
			const allVotes = VoteStore.getAllVotes();
			expect(allVotes).to.be.an('array');
			expect(allVotes).length.to.be(4);
			expect(allVotes[3].title).to.equal(newRawVote.title);
			expect(allVotes[3].choices).to.be.an('array');
		});
	});
});
