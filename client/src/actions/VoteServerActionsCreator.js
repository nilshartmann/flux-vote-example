// --------------------------------------------------------------------------------------
// ---
// ---
// ---
// --------------------------------------------------------------------------------------
// --- Copyright (c) 2015 Nils Hartmann (http://nilshartmann.net).
// -------------------------------------------------------------------------------------
"use strict";

import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

var VoteServerActionsCreator = {
	receiveAllVotes(allVotes) {
		console.log("Received Votes: ", allVotes);
		AppDispatcher.dispatch({
			type:     ActionTypes.RECEIVE_VOTES,
			allVotes: allVotes
		});
	},

	//receiveVote(vote) {
	//	console.log("Vote received: ", vote);
	//	AppDispatcher.dispatch({
	//		type: ActionTypes.RECEIVE_CURRENT_VOTE,
	//		vote: vote
	//	});
	//},

	receiveVoting(vote) {
		AppDispatcher.dispatch({
			type: ActionTypes.RECEIVE_VOTING,
			vote: vote
		});
	},

	receiveCreatedVote(vote) {
		AppDispatcher.dispatch({
			type: ActionTypes.RECEIVE_CREATED_VOTE,
			vote: vote
		});
	}
};

export default VoteServerActionsCreator;