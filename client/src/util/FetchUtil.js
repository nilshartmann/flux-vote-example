// --------------------------------------------------------------------------------------
// ---
// ---
// ---
// --------------------------------------------------------------------------------------
// --- Copyright (c) 2015 Nils Hartmann (http://nilshartmann.net).
// -------------------------------------------------------------------------------------
"use strict";

function post(url, body) {
	body = JSON.stringify(body);
	return fetch(url, {
		method:  'post',
		headers: {
			'Accept':       'application/json',
			'Content-Type': 'application/json'
		},
		body:    body
	});
}

export function getJson(path, callback) {
	fetch(path)
		.then(function (response) {
			console.log("response", response);
			return response.json();
		}).then(function (json) {
			callback(json);
		}).catch(function (ex) {
			console.log('parsing failed', ex)
		});
}

export function postJson(path, obj, callback) {
	post(path, obj)
		.then(function (response) {
			return response.json();
		}).then(function (json) {
			callback(json);
		});
}


