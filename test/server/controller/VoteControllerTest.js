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
	check = votetest.check,
	VoteController = votetest.VoteController,
	InMemoryVoteDatabase = votetest.InMemoryVoteDatabase;

describe('VoteController', function () {
	it('should be ok', function () {
		expect(VoteController).to.be.ok;
	});

	function newController(idGeneratorFn) {
		const inMemoryVoteDatabase = new InMemoryVoteDatabase({
			initialData: votetest.createUnitTestData(),
			idGenerator: idGeneratorFn
		});
		const voteController = new VoteController(inMemoryVoteDatabase);

		return voteController;
	}

	it('should return vote by id', function (done) {
		const voteController = newController();
		voteController.getVoteById({voteId: 'vote_2'}, function (err, vote) {
			check(done, function () {
				expect(err).to.not.be.ok;
				expect(vote).to.be.ok;
				expect(vote.id).to.equal('vote_2');
			})
		});
	});

	it('should have err on missing vote', function (done) {
		const voteController = newController();
		voteController.getVoteById({voteId: 'vote_not_found'}, function (err, vote) {
			check(done, function () {
				expect(err).to.be.ok;
				expect(err.details).to.be.ok;
				expect(err.details.message).to.match(/vote_not_found/);

				expect(vote).to.not.be.ok;
			});
		});
	});

	it('should register vote for a choice', function (done) {
		const voteController = newController();
		voteController.registerVoting({voteId: 'vote_2', choiceId: 'choice_3'}, function (err, result) {
			check(done, function () {
				expect(err).to.not.be.ok;
				expect(result).to.be.ok;
				expect(result.choices[2].voteCount).to.equal(6);
			});
		});
	});

	it('should have err when registering a choice for missing vote', function (done) {
		const voteController = newController();
		voteController.registerVoting({voteId: 'not_found', choiceId: 'choice_3'}, function (err, result) {
			check(done, function () {
				expect(err).to.be.ok;
				expect(err.details).to.be.ok;
				expect(err.details.message).to.match(/not_found/);

				expect(result).to.not.be.ok;
			});
		});
	});

	it('should have err when registering a mssing choice', function (done) {
		const voteController = newController();
		voteController.registerVoting({voteId: 'vote_2', choiceId: 'choice_not_found'}, function (err, result) {
			check(done, function () {
				expect(err).to.be.ok;
				expect(err.details).to.be.ok;
				//expect(err.details.message).to.match(/choice_not_found/);
				//
				//expect(result).to.not.be.ok;
			});
		});
	});

	it('should return all votes', function (done) {
		const voteController = newController();
		voteController.getVotes({}, function (err, result) {
			check(done, function () {
				expect(result).to.be.an('array');
				expect(result).to.have.length(3);
				const firstVote = result[0];
				expect(firstVote.id).to.equal('vote_1');
			});
		});

	});

	it('should create new votes', function (done) {
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

		voteController.addVote({}, newRawVote, function (err, newVote) {
			check(done, function () {
				expect(err).to.not.be.ok;
				expect(newVote).to.be.ok;
				expect(newVote.id).to.be.equal('new_vote_from_test');
				expect(newVote.title).to.be.equal(newRawVote.title);
				expect(newVote.description).to.be.equal(newRawVote.description);
				expect(newVote.choices).to.have.length(1);
				expect(newVote.choices[0].id).to.equal('c1');
				expect(newVote.choices[0].voteCount).to.equal(0);
			});
		});
	});
});

