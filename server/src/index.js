// --------------------------------------------------------------------------------------
// ---
// ---
// ---
// --------------------------------------------------------------------------------------
// --- Copyright (c) 2015 Nils Hartmann (http://nilshartmann.net).
// -------------------------------------------------------------------------------------
"use strict";
require("babel-core/polyfill");

import VoteSampleData from './mock/VoteSampleData'
import Bootstrap from './Bootstrap';

const applicationConfig = {
	webserverPort: 3000,
	db: {
		// setting initialDate leads to complete recreate of the database!
		initialData: VoteSampleData.create(),

		// set to 'mongo' to use MongoDb
		//type:        'mongo'
	}
};

Bootstrap.bootstrap(applicationConfig);

