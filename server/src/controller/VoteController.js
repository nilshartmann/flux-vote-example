// --------------------------------------------------------------------------------------
// ---
// ---
// ---
// --------------------------------------------------------------------------------------
// --- Copyright (c) 2015 Nils Hartmann (http://nilshartmann.net).
// -------------------------------------------------------------------------------------
"use strict";

import RequestError from '../webserver/RequestError';

export default class VoteController {
	constructor(voteDatabase) {
		this.voteDatabase = voteDatabase;
	}

	/** Returns a List of all Votes */
	getVotes() {
		return this.voteDatabase.mapAllVotes(function (v) {
			return v;
		});
	}

	getVoteById(params) {
		const vote = this.voteDatabase.getVoteById(params.voteId);
		if (!vote) {
			// invalid vote
			return RequestError.notFound(`vote id ${params.voteId}`);
		}

		return vote;
	}

	registerVoting(params) {
		// retrieve vote and choice
		const vote = this.getVoteById(params);
		const choice = vote.choices.find((c) => c.id === params.choiceId);
		if (!choice) {
			// invalid choice
			return RequestError.notFound(`choice id ${params.choiceId}`);
		}

		// increment voteCount
		choice.voteCount = choice.voteCount + 1;

		// return updated vote
		return vote;
	}

	addVote(params, payload) {
		for (let choice of payload.choices) {
			choice.voteCount = 0;
		}

		const newVote = {
			title:       payload.title,
			description: payload.description,
			choices:     payload.choices
		};

		return this.voteDatabase.store(newVote);

	}

}
