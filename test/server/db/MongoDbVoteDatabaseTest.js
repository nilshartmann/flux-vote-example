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
	MongoDbVoteDatabase = votetest.MongoDbVoteDatabase;

describe('MongoDbVoteDatabase', function () {
	it('should be available', function () {
		expect(MongoDbVoteDatabase).to.be.ok;
	});

	var mongoDbVoteDatabase;

	beforeEach(function (done) {
		const db = new votetest.MongoDbVoteDatabase({dbName: 'vote_unittest', initialData: votetest.createUnitTestData()});
		db.connectAndSetup(function (err) {
			if (err) {
				console.log("Could not connect and setup Mongodb: ", err);
			}
			mongoDbVoteDatabase = db;
			done();
		});
	});

	afterEach(function (done) {
		if (mongoDbVoteDatabase) {
			console.log("Closing Mongo Connection");
			mongoDbVoteDatabase.disconnect(function () {
				console.log(" #### done");
				done();
			});

			return;
		}

		done();
	});

	it('should return all votes', function (done) {
		mongoDbVoteDatabase.getAllVotes(function (err, allVotes) {
			check(done, function () {
				expect(err).to.not.be.ok;
				expect(allVotes).to.be.an('array');
				expect(allVotes).to.have.length(3);
				expect(allVotes[1]._id).to.not.be.ok;
			});
		});
	});

	it('should return nothing on missing vote', function (done) {
		mongoDbVoteDatabase.getVoteById('not-found', function (err, result) {
			check(done, function () {
				expect(err).to.not.be.ok;
				expect(result).to.not.be.ok;
			})
		});
	});

	it('should find vote by id', function (done) {
		mongoDbVoteDatabase.getVoteById('vote_2', function (err, voteById) {
			check(done, function () {
				expect(err).to.not.be.ok;
				expect(voteById).to.be.ok;
				expect(voteById._id).to.not.be.ok;
				expect(voteById.id).to.equal('vote_2');
				expect(voteById.choices).to.be.an('array');
				expect(voteById.choices).to.have.length(7);
				expect(voteById.choices[1]._id).to.not.be.ok;
			})
		});
	});

	it('should store new votes', function (done) {
		const newVote = {
			title:       'A new Vote',
			description: 'Something to describe',
			user:        'Peter',
			choices:     [
				{id: 'c_1', title: 'Choice one'},
				{id: 'c_2', title: 'Choice two'}
			]
		};

		mongoDbVoteDatabase.store(newVote, function (err, storedVote) {
			check(done, function () {
				console.log("ERR: ", err);
				expect(err).to.not.be.ok;
			})
		});
	});

	it('should update a vote', function (done) {
		mongoDbVoteDatabase.getVoteById('vote_2', function (err, voteById) {
			expect(voteById).to.be.ok;
			expect(voteById._id).to.not.be.ok;
			voteById.choices[1].voteCount = 666;
			mongoDbVoteDatabase.store(voteById, function (err, storedVote) {
				check(done, function () {
					expect(err).to.not.be.ok;

					expect(storedVote).to.be.ok;
					expect(storedVote.choices[1].voteCount).to.equal(666);
					expect(storedVote.id).to.be.equal(voteById.id);
					expect(storedVote._id).to.not.be.ok;
				});
			});
		});
	})
});

