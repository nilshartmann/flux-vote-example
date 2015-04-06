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

export default class VoteDatabase {

	constructor(initialData, idGenerator = generateNewId) {
		this.data = initialData;
		counter = initialData.length;
		this.idGenerator = idGenerator;
	}

	mapAllVotes(fn) {
		return this.data.map(fn);
	}

	getVoteById(id) {
		return this.data.find(v => v.id === id);
	}

	store(vote) {
		if (!vote.id) {
			vote.id = this.idGenerator();
		}
		this.data.push(vote);

		return vote;
	}

}