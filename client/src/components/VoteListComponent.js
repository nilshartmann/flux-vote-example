// --------------------------------------------------------------------------------------
// ---
// ---
// ---
// --------------------------------------------------------------------------------------
// --- Copyright (c) 2015 Nils Hartmann (http://nilshartmann.net).
// -------------------------------------------------------------------------------------
"use strict";

import React from '../../libs/bower/react/react';
import VoteListRowComponent from './VoteListRowComponent'
import VotingComponent from './VotingComponent'

export default class VoteListComponent extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const ix = this.props.currentVote ? this.props.allVotes.findIndex(v => v.id === this.props.currentVote.id) : -1;
		const beforeAndAfter = VoteListComponent.split(this.props.allVotes, ix);
		const currentRow = ix!==-1?<VotingComponent currentVote={this.props.currentVote} />: '';
		return (
			<div>
				<VoteListRowComponent votes={beforeAndAfter.first} />
				{currentRow}
				<VoteListRowComponent votes={beforeAndAfter.last} />
			</div>

		);
	}

	static split(elements, ix) {
		if (ix === -1) {
			return {
				first: elements,
				last: []
			}
		}

		return {
			first: elements.slice(0,ix),
			last: elements.slice(ix+1)
		};
	}

};