// --------------------------------------------------------------------------------------
// ---
// ---
// ---
// --------------------------------------------------------------------------------------
// --- Copyright (c) 2015 Nils Hartmann (http://nilshartmann.net).
// -------------------------------------------------------------------------------------
"use strict";

var counter = 0;

function newVote(id, user, title, description, choices) {
	return {
		id: 'vote_' + id,
		user,
		title,
		description,
		choices
	};
}

function c(id, title, voteCount) {
	return {
		id: 'choice_' + id,
		title,
		voteCount
	};
}

/** Testdata for running server */
function create() {
	return [
		newVote(1, 'Peter', 'How is your day?', "Tell me: how was your day so far?",
			[c(1, 'Good', 7), c(2, 'Bad', 12), c(3, 'Dunno', 1)]),
		newVote(2, 'Joe', 'Steaks!', "How do you like your steak?",
			[c(1, 'raw', 2), c(2, 'blue rare', 3), c(3, 'rare', 5), c(4, 'medium rare', 15), c(5, 'medium', 32), c(6, 'medium well', 12), c(7, 'well done', 1)]),
		newVote(3, 'Marry', 'Favorite band', "What are you listen to?",
			[c(1, 'Depeche Mode', 1700), c(2, 'Metallica', 2212), c(3, 'Napalm Death', 267), c(4, 'Iron Maiden', 1231), c(5, 'Joy Division', 800), c(6, 'The Fall', 1122)])
	]
}

/** Test data for chai unit tests */
function createUnitTestData() {
	return [
		newVote(1, 'Peter', 'How is your day?', "Tell me: how was your day so far?",
			[c(1, 'Good', 7), c(2, 'Bad', 12), c(3, 'Dunno', 1)]),
		newVote(2, 'Joe', 'Steaks!', "How do you like your steak?",
			[c(1, 'raw', 2), c(2, 'blue rare', 3), c(3, 'rare', 5), c(4, 'medium rare', 15), c(5, 'medium', 32), c(6, 'medium well', 12), c(7, 'well done', 1)]),
		newVote(3, 'Marry', 'Favorite band', "What are you listen to?",
			[c(1, 'Depeche Mode', 1700), c(2, 'Metallica', 2212), c(3, 'Napalm Death', 267), c(4, 'Iron Maiden', 1231), c(5, 'Joy Division', 800), c(6, 'The Fall', 1122)])
	]
}

var VoteSampleData = {
	create,
	createUnitTestData
};

export default VoteSampleData;