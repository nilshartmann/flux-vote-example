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
	VoteDatabase = votetest.VoteDatabase;

describe('VoteDatabase', function () {
	const voteDatabase = new VoteDatabase(votetest.createUnitTestData(), function () {
		// dummy id creator
		return 'NEW_VOTE';
	});

	it('should find vote by id', function () {
		const voteById = voteDatabase.getVoteById('vote_2');
		expect(voteById).to.be.ok;
		expect(voteById.id).to.equal('vote_2');
		expect(voteById.choices).to.be.an('array');
		expect(voteById.choices).to.have.length(7);
	});

	it('should return nothing on missing vote', function () {
		expect(voteDatabase.getVoteById('not-found')).to.not.be.ok;
	});

	it('should map all known votes', function () {
		const mappedVotes = voteDatabase.mapAllVotes(function (v) {
			return v.id;
		});
		expect(mappedVotes).to.be.an('array');
		expect(mappedVotes).to.have.length(3);
	});

	it('should store new votes', function () {
		const newVote = voteDatabase.store({title: 'Another vote'});
		expect(newVote).to.be.ok;
		expect(newVote.id).to.equal('NEW_VOTE');
		expect(newVote.title).to.equal('Another vote');

		const foundVote = voteDatabase.getVoteById('NEW_VOTE');
		expect(foundVote).to.be.ok;
		expect(foundVote.title).to.equal('Another vote');

	});
});
