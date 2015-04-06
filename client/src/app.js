// --------------------------------------------------------------------------------------
// ---
// ---
// ---
// --------------------------------------------------------------------------------------
// --- Copyright (c) 2015 Nils Hartmann (http://nilshartmann.net).
// -------------------------------------------------------------------------------------
"use strict";

import React from '../libs/bower/react/react';
import Backend from './backend/Backend';

//import VoteListComponent from './components/VoteListComponent'

import AppComponent from './components/AppComponent';
// hallo
//
Backend.getAllVotes();

React.render(
	<AppComponent />,
	document.body
);






