// --------------------------------------------------------------------------------------
// ---
// ---
// ---
// --------------------------------------------------------------------------------------
// --- Copyright (c) 2015 Nils Hartmann (http://nilshartmann.net).
// -------------------------------------------------------------------------------------
"use strict";

export default class RequestError extends Error {
	constructor(code, message) {
		super(message);
		this.message = message;
		this.details = {
			code,
			message
		}
	}

	static notFound(msg) {
		throw new RequestError(404, msg);
	}
}


