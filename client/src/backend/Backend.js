// --------------------------------------------------------------------------------------
// ---
// ---
// ---
// --------------------------------------------------------------------------------------
// --- Copyright (c) 2015 Nils Hartmann (http://nilshartmann.net).
// -------------------------------------------------------------------------------------
"use strict";

import * as fu from '../util/FetchUtil';
import VoteServerActionsCreator from '../actions/VoteServerActionsCreator';

var Backend = {
	getAllVotes() {
		return fu.getJson('/api/votes', function(result) {
			VoteServerActionsCreator.receiveAllVotes(result);
		});
	},

	getVote(voteId) {
		console.log("#### getVote: ", voteId);
		return fu.getJson(`/api/votes/${voteId}`, function (result) {
			VoteServerActionsCreator.receiveVote(result);
		});
	},

	registerVote(voteId, choiceId) {
		console.log(`Registering choice ${choiceId} of vote ${voteId} at backend`);

		return fu.postJson(`/api/votes/${voteId}/choices/${choiceId}/vote`, {}, function (result) {
			VoteServerActionsCreator.receiveVoting(result);
		});
	},

	addVote(vote) {
		console.log("Add vote to backend: ", vote);

		return fu.postJson('/api/votes', vote, function (result) {
			console.log("RECEIVED NEW VOTE FROM BACKEND: ", result);
			VoteServerActionsCreator.receiveCreatedVote(result);
		});
	}
};

export default Backend;

