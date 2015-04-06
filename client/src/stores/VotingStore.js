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

var currentVote = null;

function setCurrentVoteFromReceivedVote(vote) {
	if (!vote) {
		currentVote = null;
		return;
	}

	const choices = vote.choices;
	var totalVoteCount = 0;

	for (let c of choices) {
		totalVoteCount += c.voteCount;
	}
	let factor = 100 / totalVoteCount;
	choices.map((c)=>c.percent = c.voteCount * factor);

	currentVote = vote;
}

var VotingStore = StoreUtil.create({
		hasCurrentVote() {
			return currentVote !== null;
		},

		getCurrentVote() {
			return currentVote;
		}
	}
);
// VotingComponent.vote(vote, choice)
// PUT /api/votes/ID/choices/CHOICEID
// 	PUT vote server => callback receiveVoting

AppDispatcher.register(function (action) {
	switch (action.type) {
		case ActionTypes.RECEIVE_CURRENT_VOTE:
			console.log("VotingStore received current vote", action);
			setCurrentVoteFromReceivedVote(action.vote);
			VotingStore.emitChange();
			break;
		case ActionTypes.RECEIVE_VOTING:
			//if (currentVote && currentVote.id === action.vote.id) {
				setCurrentVoteFromReceivedVote(action.vote);
				VotingStore.emitChange();
			//}
			break;

		default:
	}

	return true;
});

export default VotingStore;