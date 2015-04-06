// --------------------------------------------------------------------------------------
// ---
// ---
// ---
// --------------------------------------------------------------------------------------
// --- Copyright (c) 2015 Nils Hartmann (http://nilshartmann.net).
// -------------------------------------------------------------------------------------
"use strict";

"use strict";

import React from '../../libs/bower/react/react';
import VoteStore from '../stores/VoteStore';
import VotingStore from '../stores/VotingStore';
import VoteListComponent from './VoteListComponent'
import NewVoteButtonComponent from './NewVoteButtonComponent'
import VoteComposerComponent from './VoteComposerComponent'

export default class AppComponent extends React.Component {

	constructor() {
		super();
		this._onChange = this._onChange.bind(this);
		this.state = AppComponent.getStateFromStores();
	}

	componentDidMount() {
		VoteStore.addChangeListener(this._onChange);
		VotingStore.addChangeListener(this._onChange);
	}

	componentWillUnmount() {
		VoteStore.removeChangeListener(this._onChange);
		VotingStore.removeChangeListener(this._onChange);
	}

	_onChange() {
		this.setState(AppComponent.getStateFromStores());
	}

	render() {
		return (
			<div>
				<div className="navbar-fixed">
					<nav>
						<div className="container">
							<div className="nav-wrapper">
								<a href="#" className="brand-logo">Votes as a Service!</a>
							</div>
						</div>
					</nav>
				</div>

				<div className="container">
					<VoteListComponent allVotes={this.state.allVotes} currentVote={this.state.currentVote}/>
					<VoteComposerComponent />
				</div>

			</div>
		);
	}

	static getStateFromStores() {
		return {
			allVotes:    VoteStore.getAllVotes(),
			currentVote: VotingStore.getCurrentVote()
		}
	}
}
