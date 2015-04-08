// --------------------------------------------------------------------------------------
// ---
// ---
// ---
// --------------------------------------------------------------------------------------
// --- Copyright (c) 2015 Nils Hartmann (http://nilshartmann.net).
// -------------------------------------------------------------------------------------
"use strict";
require("babel-core/polyfill");
const expect = require('chai').expect;

const RequestError = require('../../_dist/server/webserver/RequestError');

const VoteSampleData = require('../../_dist/server/mock/VoteSampleData');
const InMemoryVoteDatabase = require('../../_dist/server/db/InMemoryVoteDatabase');
const MongoDbVoteDatabase = require('../../_dist/server/db/MongoDbVoteDatabase');
const VoteController = require('../../_dist/server/controller/VoteController');

const Bootstrap = require('../../_dist/server/Bootstrap');

function createUnitTestData() {
	return VoteSampleData.createUnitTestData();
}

// make sure 'done' is called even when a chai assertion failed
function check(done, fn) {
	try {
		fn();
		done();
	} catch (err) {
		done(err);
	}
}

//noinspection JSPrimitiveTypeWrapperUsage
module.exports = {
	expect,
	createUnitTestData,
	check,

	RequestError,
	InMemoryVoteDatabase,
	MongoDbVoteDatabase,
	VoteController,

	Bootstrap
};

