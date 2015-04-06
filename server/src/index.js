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

Bootstrap.bootstrap(VoteSampleData.create());

