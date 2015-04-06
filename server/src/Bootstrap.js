// --------------------------------------------------------------------------------------
// ---
// ---
// ---
// --------------------------------------------------------------------------------------
// --- Copyright (c) 2015 Nils Hartmann (http://nilshartmann.net).
// -------------------------------------------------------------------------------------
"use strict";

import WebServer from './webserver/WebServer';
import VoteController from './controller/VoteController';

//
import VoteDatabase from './db/VoteDatabase';

function bootstrap(initialData, port = 3000, callback = null) {
	const voteDatabase = new VoteDatabase(initialData);

	const voteController = new VoteController(voteDatabase);
	const webServer = new WebServer(port);

	webServer.addStaticFolder(`${__dirname}/../../_dist/client`);
	webServer.addRoute('GET /api/votes', voteController.getVotes.bind(voteController));
	webServer.addRoute('GET /api/votes/{voteId}', voteController.getVoteById.bind(voteController));
	webServer.addRoute('POST /api/votes', voteController.addVote.bind(voteController));
	webServer.addRoute('POST /api/votes/{voteId}/choices/{choiceId}/vote', voteController.registerVoting.bind(voteController));
	webServer.start(function (server) {
		if (callback) {
			return callback(server);
		}
	});
}

var Bootstrap = {
	bootstrap
};

export default Bootstrap;