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
	InMemoryVoteDatabase = votetest.InMemoryVoteDatabase;

describe('InMemoryInMemoryVoteDatabase', function () {
	const inMemoryVoteDatabase = new InMemoryVoteDatabase({
		initialData: votetest.createUnitTestData(),
		idGenerator() {
			// dummy id creator
			return 'NEW_VOTE';
		}
	});

	it('should find vote by id', function (done) {
		inMemoryVoteDatabase.getVoteById('vote_2', function (err, voteById) {
			check(done, function() {
				expect(err).to.not.be.ok;
				expect(voteById).to.be.ok;
				expect(voteById.id).to.equal('vote_2');
				expect(voteById.choices).to.be.an('array');
				expect(voteById.choices).to.have.length(7);
			})
		});
	});

	it('should return nothing on missing vote', function (done) {
		inMemoryVoteDatabase.getVoteById('not-found', function (err, result) {
			check(done, function() {
				expect(err).to.not.be.ok;
				expect(result).to.not.be.ok;
			})
		});
	});

	it('should get all known votes', function (done) {
		inMemoryVoteDatabase.getAllVotes(function (err, allVotes) {
			check(done, function() {
				expect(err).to.not.be.ok;
				expect(allVotes).to.be.an('array');
				expect(allVotes).to.have.length(3);
			});
		});

	});

	it('should store new votes', function (done) {
		inMemoryVoteDatabase.store({title: 'Another vote'}, function (err, newVote) {
			check(done, function() {
				expect(err).to.not.be.ok;
				expect(newVote).to.be.ok;
				expect(newVote.id).to.equal('NEW_VOTE');
				expect(newVote.title).to.equal('Another vote');

				inMemoryVoteDatabase.getVoteById('NEW_VOTE', function (err2, foundVote) {
					expect(foundVote).to.be.ok;
					expect(foundVote.title).to.equal('Another vote');
				});

			})
		});

	});
});
