// --------------------------------------------------------------------------------------
// ---
// ---
// ---
// --------------------------------------------------------------------------------------
// --- Copyright (c) 2015 Nils Hartmann (http://nilshartmann.net).
// -------------------------------------------------------------------------------------
"use strict";

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const VoteSchema = new Schema({
	id:          {type: String, required: true, unique: true},
	user:        {type: String}, // not used yet
	title:       {type: String, required: true},
	description: {type: String, required: true},
	choices:     [
		{
			_id: false,
			id:        {type: String, required: true},
			title:     {type: String, required: true},
			voteCount: {type: Number, required: true, default: 0}
		}
	]
});

VoteSchema.methods.snapshot = function () {
	return {
		id:          this.id,
		user:        this.user,
		title:       this.title,
		description: this.description,
		choices:     this.choices
	}
};

const VoteModel = mongoose.model('VoteModel', VoteSchema);

export default class MongoDbVoteDatabase {
	constructor(dbConfig) {
		super();
		console.log("Using MongoDbVoteDatabase");
		this._dbConfig = dbConfig;
	}

	connectAndSetup(callback) {
		const dbName = this._dbConfig.dbName || 'vote-db';
		const url = `mongodb://localhost/${dbName}`;

		console.log(`Connecting to '${url}`);
		mongoose.connect(url, {}, (err) => {
			if (err) {
				return callback(err);
			}
			if (!this._dbConfig.initialData) {
				return callback();
			}

			// (Re-)creates the whole database.
			console.log("Re-Creating Mongo Database");
			mongoose.connection.db.dropDatabase((err) => {
				if (err) {
					return callback(err);
				}

				// Make sure indexes are created
				VoteModel.ensureIndexes((indexErr) => {
					if (indexErr) {
						return callback(indexErr);
					}
					VoteModel.create(this._dbConfig.initialData, callback);
				});
			});
		});
	}

	/** Disconnect from MongoDb */
	disconnect(callback) {
		mongoose.disconnect(callback);
	}

	getAllVotes(callback) {
		VoteModel.find({}, function (err, result) {
			if (err) {
				return callback(err);
			}

			return callback(null, result.map((vote) => vote.snapshot()));
		});
	}

	getVoteById(id, callback) {
		VoteModel.findOne({'id': id}, function (err, vote) {
			if (err) {
				return callback(err);
			}
			callback(null, (vote ? vote.snapshot() : null));
		});
	}

	store(vote, callback) {
		if (!vote.id) {
			vote.id = mongoose.Types.ObjectId().toString();
			const mongoVote = new VoteModel(vote);
			return mongoVote.save(function (err, newVote) {
				if (err) {
					return callback(err);
				}
				return callback(null, newVote.snapshot());
			});
		}

		VoteModel.findOneAndUpdate({'id': vote.id}, vote, {'new': 'true'}, function (err, update) {
			if (err) {
				return callback(err);
			}
			return callback(null, update.snapshot());
		});

	}
}
