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
	FetchUtil = votetest.FetchUtil,
	VoteStore = votetest.VoteStore,
	InMemoryVoteDatabase = votetest.InMemoryVoteDatabase,
	VotingStore = votetest.VotingStore,
	VoteController = votetest.VoteController,
	VoteListActionsCreator = votetest.VoteListActionsCreator,
	VotingActionsCreator = votetest.VotingActionsCreator,
	sinon = votetest.sinon;

describe('Data Flow', function () {
	var testData;
	var voteController;
	var getJsonStub;
	var postJsonStub;

	function prepareGetJsonStub(handler) {
		getJsonStub = sinon.stub(FetchUtil, 'getJson', handler);
	}

	function preparePostJsonStub(handler) {
		getJsonStub = sinon.stub(FetchUtil, 'postJson', handler);
	}

	beforeEach(function () {
		testData = votetest.createUnitTestData();
		voteController = new VoteController(new InMemoryVoteDatabase({initialData: testData}));
	});

	afterEach(function () {
		if (getJsonStub) {
			getJsonStub.restore();
		}

		if (postJsonStub) {
			postJsonStub.restore();
		}
	});

	it('should pass allVotes from Backend To VoteStore', function () {
		// Prepare stub
		prepareGetJsonStub(function (p, cb) {
			voteController.getVotes({}, function(err, result) {
				cb(result);
			});
		});

		// Trigger action...
		Backend.getAllVotes();

		// verify
		const allVotes = VoteStore.getAllVotes();
		expect(allVotes).to.be.an('array');
		expect(allVotes).to.have.length(3);
		expect(allVotes[0].id).to.be.equal('vote_1');
	});

	it('should pass current vote to VotingStore', function () {
		// Prepare stub
		prepareGetJsonStub(function (p, cb) {
			// extract vote id from path
			const voteId = p.split('/')[3];
			cb(voteController.getVoteById({'voteId': voteId}))
		});

		// Trigger
		VoteListActionsCreator.selectVote(testData[1]);
		// Verify
		const currentVote = VotingStore.getCurrentVote();
		expect(currentVote).to.be.ok;
		expect(currentVote.id).to.be.equal('vote_2');
		expect(currentVote.choices).to.be.an('array');
		expect(currentVote.choices[0].percent).to.be.at.least(1);
	});

	it('should increment vote count and pass to VotingStore', function () {
		// Prepare stub
		preparePostJsonStub(function (p, obj, cb) {
			// extract vote id from path
			const split = p.split('/');
			const voteId = split[3];
			const choiceId = split[5];
			voteController.registerVoting({'voteId': voteId, 'choiceId': choiceId}, function(err, result){
				return cb(result);
			});
		});

		// Trigger
		VotingActionsCreator.vote('vote_3', 'choice_5');

		// Verify
		const currentVote = VotingStore.getCurrentVote();
		expect(currentVote).to.be.ok;
		expect(currentVote.id).to.be.equal('vote_3');
		expect(currentVote.choices).to.be.an('array');
		expect(currentVote.choices[4].voteCount).to.be.equal(801);
	});
});
