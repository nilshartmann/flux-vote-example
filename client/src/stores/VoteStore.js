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
import StoreUtil from '../util/StoreUtil';

var allVotes = [];

var VoteStore = StoreUtil.create({
		getAllVotes() {
			return allVotes;
		}
	}
);

function convertVote(basicVote) {
// determine total votes
	console.log("convert Basic Vote", basicVote);
	basicVote.totalVotes = 0;
	basicVote.choices.map((c) => basicVote.totalVotes += c.voteCount);
	return basicVote;

}



AppDispatcher.register(function (action) {
	switch (action.type) {
		case ActionTypes.RECEIVE_VOTES:
			console.log("Received votes");
			allVotes = action.allVotes.map((basicVote) => {
				return convertVote(basicVote)
			});
			VoteStore.emitChange();
			break;
		case ActionTypes.RECEIVE_CREATED_VOTE:
			allVotes.push(convertVote(action.vote));
			VoteStore.emitChange();
			break;
		default:
	}

	return true;
});

export default VoteStore;