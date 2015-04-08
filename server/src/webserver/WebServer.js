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

	addRoute(methodAndRoute, payloadNeeded, handler) {
		if (arguments.length===2) {
			handler = payloadNeeded;
			payloadNeeded = false;
		}

		const ix = methodAndRoute.indexOf(' ');
		const method = methodAndRoute.substr(0, ix);
		const path = methodAndRoute.substr(ix + 1);

		var runner = function (request, reply) {
			const params = {};
			for (let i in request.params) {
				params[i] = encodeURIComponent(request.params[i]);
			}

			function callback(err, result) {
				if (err) {
					if (err instanceof RequestError) {
						return reply(err.details).code(err.details.code);
					}

					console.log("ERR in Request Handler: ", err);
					return reply(err).code(500);
				}

				return reply(result);
			}

			handler(params,
				(payloadNeeded ? request.payload : callback),
				(payloadNeeded ? callback : undefined));
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

