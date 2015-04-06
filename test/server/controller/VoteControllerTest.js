// --------------------------------------------------------------------------------------
// ---
// ---
// ---
// --------------------------------------------------------------------------------------
// --- Copyright (c) 2015 Nils Hartmann (http://nilshartmann.net).
// -------------------------------------------------------------------------------------
"use strict";

const votetest = require('../index.js'),
	expect = votetest.expect,
	RequestError = votetest.RequestError,
	VoteController = votetest.VoteController,
	VoteDatabase = votetest.VoteDatabase;


describe('VoteController', function () {
	it('should be ok', function () {
		expect(VoteController).to.be.ok
	});

	function newController(idGeneratorFn) {
		const voteDatabase = new VoteDatabase(votetest.createUnitTestData(), idGeneratorFn);
		const voteController = new VoteController(voteDatabase);

		return voteController;
	}

	it('should return vote by id', function () {
		const voteController = newController();
		const vote = voteController.getVoteById({voteId: 'vote_2'});
		expect(vote).to.be.ok;
		expect(vote.id).to.equal('vote_2');
	});

	it('should throw RequestException on missing vote', function () {
		const voteController = newController();
		expect(function () {
			voteController.getVoteById({voteId: 'vote_not_found'})
		}).to.throw(RequestError, /vote_not_found/);
	});

	it('should register vote for a choice', function () {
		const voteController = newController();
		const result = voteController.registerVoting({voteId: 'vote_2', choiceId: 'choice_3'});
		expect(result).to.be.ok;
		expect(result.choices[2].voteCount).to.equal(6);
	});

	it('should return basic votes', function () {
		const voteController = newController();
		const result = voteController.getVotes();
		expect(result).to.be.an('array');
		expect(result).to.have.length(3);

		const firstVote = result[0];
		expect(firstVote.id).to.equal('vote_1');
	});

	it('should create new votes', function () {
		const voteController = newController(function () {
			return 'new_vote_from_test';
		});

		const newRawVote = {
			title:       'Just another quick vote',
			description: 'Tell me your opinion',
			choices:     [{
				id:    'c1',
				title: 'Choice one'
			}]
		};

		const newVote = voteController.addVote({}, newRawVote);
		expect(newVote).to.be.ok;
		expect(newVote.id).to.be.equal('new_vote_from_test');
		expect(newVote.title).to.be.equal(newRawVote.title);
		expect(newVote.description).to.be.equal(newRawVote.description);
		expect(newVote.choices).to.have.length(1);
		expect(newVote.choices[0].id).to.equal('c1');
		expect(newVote.choices[0].voteCount).to.equal(0);

	});
});

