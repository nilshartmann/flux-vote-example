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
	getVotes(params, callback) {
		this.voteDatabase.getAllVotes(callback);
	}

	getVoteById(params, callback) {
		this.voteDatabase.getVoteById(params.voteId, function(err, vote) {
			if (!vote) {
				// vote not found
				return callback(RequestError.notFound(`vote id ${params.voteId}`), vote);
			}

			callback(null, vote);
		});
	}

	registerVoting(params, callback) {
		// retrieve vote and choice
		this.getVoteById(params, (err, vote) => {
			if (err) { return callback(err); }

			const choice = vote.choices.find((c) => c.id === params.choiceId);
			if (!choice) {
				// invalid choice
				return callback(RequestError.notFound(`choice id ${params.choiceId}`));
			}

			// increment voteCount
			choice.voteCount = choice.voteCount + 1;

			// save vote
			this.voteDatabase.store(vote, function (err, storedVote) {
				callback(err, storedVote);
			});

			// return updated vote
			//return callback(null, vote);
		});
	}

	addVote(params, payload, callback) {
		for (let choice of payload.choices) {
			choice.voteCount = 0;
		}

		const newVote = {
			title:       payload.title,
			description: payload.description,
			choices:     payload.choices
		};

		this.voteDatabase.store(newVote, callback);

	}

}
