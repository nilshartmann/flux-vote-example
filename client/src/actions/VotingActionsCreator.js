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
import Backend from '../backend/Backend';

var VotingActionsCreator = {
	vote(voteId, choiceId) {
		Backend.registerVote(voteId, choiceId);
	},

	dismiss() {
		AppDispatcher.dispatch({
			type: ActionTypes.RECEIVE_CURRENT_VOTE,
			vote: null
		});
	}
};

export default VotingActionsCreator;
