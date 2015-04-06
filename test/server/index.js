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
const VoteDatabase = require('../../_dist/server/db/VoteDatabase');
const VoteController = require('../../_dist/server/controller/VoteController');

const Bootstrap = require('../../_dist/server/Bootstrap');

function createUnitTestData() {
	return VoteSampleData.createUnitTestData();
}

//noinspection JSPrimitiveTypeWrapperUsage
module.exports = {
	expect,
	createUnitTestData,

	RequestError,
	VoteDatabase,
	VoteController,

	Bootstrap
};

