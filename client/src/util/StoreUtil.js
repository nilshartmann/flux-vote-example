// --------------------------------------------------------------------------------------
// ---
// ---
// ---
// --------------------------------------------------------------------------------------
// --- Copyright (c) 2015 Nils Hartmann (http://nilshartmann.net).
// -------------------------------------------------------------------------------------
"use strict";
import assign from 'object-assign';
import EventEmitter from 'events';

const CHANGE_EVENT = 'change';

function create(store) {
	return assign({}, EventEmitter.prototype, {
			emitChange: function () {
				console.log("Emitting Change");
				this.emit(CHANGE_EVENT);
			},

			addChangeListener: function (callback) {
				this.on(CHANGE_EVENT, callback);
			},

			removeChangeListener: function (callback) {
				this.removeListener(CHANGE_EVENT, callback);
			}
		},
		store
	);
}

var StoreUtil = {
	create
};

export default StoreUtil;