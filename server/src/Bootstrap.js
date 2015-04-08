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
import InMemoryVoteDatabase from './db/InMemoryVoteDatabase';
import MongoDbVoteDatabase from './db/MongoDbVoteDatabase';

function bootstrap(config = {}, callback = null) {
	const webserverPort = config.webserverPort || 3000;
	const dbType = config.db.type || "inMemory";

	const voteDatabase = (dbType === 'mongo' ? new MongoDbVoteDatabase(config.db) : new InMemoryVoteDatabase(config.db));

	voteDatabase.connectAndSetup(function (err) {
		if (err) {
			throw new Error(err);
		}

		const voteController = new VoteController(voteDatabase);
		const webServer = new WebServer(webserverPort);

		webServer.addStaticFolder(`${__dirname}/../../_dist/client`);
		webServer.addRoute('GET /api/votes', voteController.getVotes.bind(voteController));
		webServer.addRoute('GET /api/votes/{voteId}', voteController.getVoteById.bind(voteController));
		webServer.addRoute('POST /api/votes', true, voteController.addVote.bind(voteController));
		webServer.addRoute('POST /api/votes/{voteId}/choices/{choiceId}/vote', voteController.registerVoting.bind(voteController));
		webServer.start(function (server) {
			if (callback) {
				return callback(server);
			}
		});
	});

}

var Bootstrap = {
	bootstrap
};

export default Bootstrap;