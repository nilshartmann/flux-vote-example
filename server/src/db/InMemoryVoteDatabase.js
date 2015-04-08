// --------------------------------------------------------------------------------------
// ---
// --- Simulates a 'real' database
// ---
// --------------------------------------------------------------------------------------
// --- Copyright (c) 2015 Nils Hartmann (http://nilshartmann.net).
// -------------------------------------------------------------------------------------
"use strict";

var counter = 0;

function generateNewId() {
	counter++;

	return 'v_' + counter;
}

export default class InMemoryVoteDatabase {
	constructor(dbConfiguration = {}) {
		console.log("Using InMemoryVoteDatabase");
		this.data = dbConfiguration.initialData;
		counter = this.data.length;
		this.idGenerator = dbConfiguration.idGenerator || generateNewId;
	}

	connectAndSetup(callback) {
		callback();
	}

	/** Returns all stored votes as second parameter to the given callback */
	getAllVotes(callback) {
		callback(null, this.data.slice());
	}

	/** returns the requested vote as callbacks second arg */
	getVoteById(id, callback) {
		callback(null, this.data.find(v => v.id === id));
	}

	/** Stores the given vote. Returns stored vote as callbacks second arg */
	store(vote, callback) {
		if (!vote.id) {
			vote.id = this.idGenerator();
		}
		this.data.push(vote);

		callback(null, vote);
	}

}