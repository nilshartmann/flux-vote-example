// --------------------------------------------------------------------------------------
// ---
// ---
// ---
// --------------------------------------------------------------------------------------
// --- Copyright (c) 2015 Nils Hartmann (http://nilshartmann.net).
// -------------------------------------------------------------------------------------
"use strict";

import React from '../../libs/bower/react/react';
import VotingActionsCreator from '../actions/VotingActionsCreator'

export default class VoteListCurrentRowComponent extends React.Component {

	constructor(props) {
		super(props);
	}

	//_registerVote(voteId, choiceId) {
	//	VotingActionsCreator.vote(voteId, choiceId);
	//}
	//
	//_dismiss() {
	//	VotingActionsCreator.dismiss();
	//}

	render() {
		const btnClass = this.props.enabled ? 'red' : 'disabled grey';
		return (
			<div className="fixed-action-btn" style={{bottom: '45px', right: '24px'}}>
				<a className={'btn-floating btn-large ' + btnClass}>
					<i className="large mdi-content-add"></i>
				</a>
			</div>
		);
	}
};
