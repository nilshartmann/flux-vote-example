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

var VoteListActionsCreator = {
	selectVote(vote) {
		AppDispatcher.dispatch({
			type: ActionTypes.RECEIVE_VOTING,
			vote: vote
		});
	}
};

export default VoteListActionsCreator;
