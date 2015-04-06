// --------------------------------------------------------------------------------------
// ---
// ---
// ---
// --------------------------------------------------------------------------------------
// --- Copyright (c) 2015 Nils Hartmann (http://nilshartmann.net).
// -------------------------------------------------------------------------------------

"use strict";

import Hapi from 'hapi';
import RequestError from './RequestError';

export default class WebServer {
	constructor(port = 6000) {
		this.server = new Hapi.Server();
		this.server.connection({port});
	}

	addStaticFolder(folder) {
		console.log(`Serving from ${folder}`);
		this.server.route({
			method:  'GET',
			path:    '/{param*}',
			handler: {
				directory: {
					path: folder
				}
			}
		});
	}

	addRoute(methodAndRoute, handler) {
		const ix = methodAndRoute.indexOf(' ');
		const method = methodAndRoute.substr(0, ix);
		const path = methodAndRoute.substr(ix + 1);

		var runner = function (request, reply) {

			const params = {};
			for (let i in request.params) {
				params[i] = encodeURIComponent(request.params[i]);
			}

			var result;
			try {
				result = handler(params, request.payload);
			} catch (e) {
				if (e instanceof RequestError) {
					return reply(e.details).code(e.details.code);
				}

				throw e;
			}

			return reply(result);
		};

		this.server.route({
			method,
			path,
			handler: runner
		});

		return this;
	}

	start(callback) {
		this.server.start(() => {
			console.log('Server running at:', this.server.info.uri);
			if (callback) {
				callback(this.server);
			}
		});
	}

	//
	//routes() {
	//	return this._routes;
	//}
	//
	//addInterceptor(interceptor) {
	//	this.app.use(interceptor);
	//
	//	return this;
	//}
	//
	//addStaticHandler(folder) {
	//	console.log(`Serving static files from ${folder}`);
	//	this.app.use(serve(folder));
	//	return this;
	//}
	//
	//run(port) {
	//	port = port || 3000;
	//	this.app.listen(port);
	//
	//	console.log(`Server started and listening on port ${port}`);
	//}
	//
	//static *toJson(ctx) {
	//	console.log("BLA STATIC");
	//	return yield parse.json(ctx);
	//}

};

//WebServer.toJson = function*(ctx) {
//	return yield parse.json(ctx);
//};

