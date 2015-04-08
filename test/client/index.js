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
const sinon = require('sinon');

// Server components needed for integration tests
const VoteSampleData = require('../../_dist/server/mock/VoteSampleData');
const InMemoryVoteDatabase = require('../../_dist/server/db/InMemoryVoteDatabase');
const VoteController = require('../../_dist/server/controller/VoteController');

const Bootstrap = require('../../_dist/server/Bootstrap');

// Client components under test
const FetchUtil = require('../../_dist/client/app/util/FetchUtil');
const Backend = require('../../_dist/client/app/backend/Backend');

const VoteStore = require('../../_dist/client/app/stores/VoteStore');
const VotingStore = require('../../_dist/client/app/stores/VotingStore');

const VoteListActionsCreator = require('../../_dist/client/app/actions/VoteListActionsCreator');
const VotingActionsCreator = require('../../_dist/client/app/actions/VotingActionsCreator');
const VoteComposerActionsCreator = require('../../_dist/client/app/actions/VoteComposerActionsCreator');

function createUnitTestData() {
	return VoteSampleData.createUnitTestData();
}

//noinspection JSPrimitiveTypeWrapperUsa
module.exports = {
	expect,
	sinon,
	createUnitTestData,

	InMemoryVoteDatabase,
	VoteController,

	Bootstrap,

	FetchUtil,
	Backend,

	VoteStore,
	VotingStore,

	VoteListActionsCreator,
	VotingActionsCreator,
	VoteComposerActionsCreator
};


