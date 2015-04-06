// --------------------------------------------------------------------------------------
// ---
// ---
// ---
// --------------------------------------------------------------------------------------
// --- Copyright (c) 2015 Nils Hartmann (http://nilshartmann.net).
// -------------------------------------------------------------------------------------
"use strict";

const votetest = require('./index.js'),
	expect = votetest.expect,
	Bootstrap = votetest.Bootstrap;

describe('VoteServer', function () {

	var voteServer;

	// make sure 'done' is called even when a chai assertion failed
	function check(done, fn) {
		try {
			fn();
			done();
		} catch (err) {
			done(err);
		}
	}

	before(function (done) {
		Bootstrap.bootstrap(votetest.createUnitTestData(), 6666, function (runningServer) {
			voteServer = runningServer;
			done();
		});
	});

	after(function (done) {
		if (voteServer) {
			console.log("Stopping server");
			voteServer.stop(done);
		}
	});

	it('should return a single vote', function (done) {
		var options = {
			method: "GET",
			url:    "/api/votes/vote_2"
		};

		voteServer.inject(options, function (response) {
			check(done, function () {
				expect(response.statusCode).to.equal(200);
				expect(response.result).to.be.ok;
				expect(response.result.id).to.equal('vote_2');
				expect(response.result.choices).to.be.an('array');
				expect(response.result.choices).to.have.length(7);
				expect(response.result.choices[3].id).to.be.equal('choice_4');
			});
		});
	});

	it('should return a list of basic votes', function (done) {
		var options = {
			method: "GET",
			url:    "/api/votes"
		};

		voteServer.inject(options, function (response) {
			check(done, function () {
				expect(response.statusCode).to.equal(200);
				expect(response.result).to.be.ok;
				console.log("result: ", response.result);
				expect(response.result).is.an('array');
				expect(response.result).has.length(3);
				expect(response.result[1].id).to.be.equal('vote_2');
			});
		});
	});

	it('should increment vote count', function (done) {
		var options = {
			method: "POST",
			url:    "/api/votes/vote_3/choices/choice_4/vote"
		};

		voteServer.inject(options, function (response) {
			check(done, function () {
				expect(response.statusCode).to.equal(200);
				expect(response.result).to.be.ok;
				console.log("result: ", response.result);
				expect(response.result.id).to.be.equal('vote_3');
				expect(response.result.choices[3].id).to.be.equal('choice_4');
				expect(response.result.choices[3].voteCount).to.be.equal(1232);
			});
		});
	});

	it('should add new votes', function (done) {
		const newRawVote = {
			title:       'Just another vote',
			description: 'What do you think?',
			choices:     [{
				id:    'c_one',
				title: 'Best Choice'
			}]
		};

		const options = {
			method:  "POST",
			url:     "/api/votes",
			payload: JSON.stringify(newRawVote)
		};

		voteServer.inject(options, function (response) {
			check(done, function () {
				expect(response.statusCode).to.equal(200);
				expect(response.result).to.be.ok;
				console.log("result: ", response.result);
				expect(response.result.id).to.be.ok;
				expect(response.result.title).to.be.equal(newRawVote.title);
				expect(response.result.choices).to.have.length(1);
				expect(response.result.choices[0].title).to.equal(newRawVote.choices[0].title);
			});
		});
	});

});
