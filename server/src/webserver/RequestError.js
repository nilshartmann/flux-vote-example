// --------------------------------------------------------------------------------------
// ---
// ---
// ---
// --------------------------------------------------------------------------------------
// --- Copyright (c) 2015 Nils Hartmann (http://nilshartmann.net).
// -------------------------------------------------------------------------------------
"use strict";

export default class RequestError {
	constructor(code, message) {
		this.details = {
			code,
			message
		}
	}

	static notFound(msg) {
		return new RequestError(404, msg);
	}
}


