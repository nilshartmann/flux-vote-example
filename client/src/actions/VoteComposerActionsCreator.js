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

var VoteComposerActionsCreator = {
	addVote(newVote) {
		Backend.addVote(newVote);
	}
};

export default VoteComposerActionsCreator;
