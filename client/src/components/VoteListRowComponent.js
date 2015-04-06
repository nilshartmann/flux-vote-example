// --------------------------------------------------------------------------------------
// ---
// ---
// ---
// --------------------------------------------------------------------------------------
// --- Copyright (c) 2015 Nils Hartmann (http://nilshartmann.net).
// -------------------------------------------------------------------------------------
"use strict";

import React from '../../libs/bower/react/react';
import VoteListActionsCreator from '../actions/VoteListActionsCreator'

export default class VoteListRowComponent extends React.Component {

	constructor(props) {
		super(props);
	}

	_chooseVote(vote) {
		VoteListActionsCreator.selectVote(vote);
	}

	render() {
		if (this.props.votes.length<1) {
			return false;
		}

		return <div className="row">
			<div className="col s10 offset-s1">
				<div className="collection z-depth-1">
					{this.props.votes.map((vote) => {
						return <a key={vote.id} className="collection-item grey-text text-darken-7"
											onClick={this._chooseVote.bind(this, vote)}>
							<h5>{vote.title}</h5>
							<span className="badge teal lighten-2 grey-text text-lighten-2">{vote.totalVotes} Votes so far</span>
							<p>{vote.description}</p>
						</a>
					})
					}
				</div>
			</div>
		</div>;
	}
};
