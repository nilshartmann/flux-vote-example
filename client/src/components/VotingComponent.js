// --------------------------------------------------------------------------------------
// ---
// ---
// ---
// --------------------------------------------------------------------------------------
// --- Copyright (c) 2015 Nils Hartmann (http://nilshartmann.net).
// -------------------------------------------------------------------------------------
"use strict";

import React from 'react';
import VotingActionsCreator from '../actions/VotingActionsCreator'

export default class VoteListCurrentRowComponent extends React.Component {

	constructor(props) {
		super(props);
	}

	_registerVote(voteId, choiceId) {
		VotingActionsCreator.vote(voteId, choiceId);
	}

	_dismiss() {
		VotingActionsCreator.dismiss();
	}

	render() {
		const vote = this.props.currentVote;

		return <div className="row">
			<div className="col s12">
				<ul className="collection with-header z-depth-1 ">
					<li className="collection-header" onClick={this._dismiss.bind(this)}>
						<h4>{vote.title}</h4>

						<p>{vote.description}</p>

					</li>
					{vote.choices.map((choice) => {
						return (
							<li>
								<a key={choice.id} onClick={this._registerVote.bind(this, vote.id, choice.id)}
									 className="collection-item" style={{'paddingBottom': '0'}}>
									<div className="row" style={{'marginBottom':'0'}}>
										<div className="col offset-s1 s9">
											{choice.title}
											<span className="badge teal lighten-2 grey-text text-darken-3">{choice.voteCount}</span>

											<div className="progress" style={{height: '16px'}}>
												<div className="determinate" style={{width: choice.percent+'%'}}></div>
											</div>
										</div>
									</div>
								</a>
							</li>
						);
					})}
					<li className="collection-item">
						<div className="row" style={{'marginBottom':'0'}}>
							<div className="col offset-s1 s9">
								<a className="waves-effect waves-light btn" onClick={this._dismiss.bind(this)}><i
									className="mdi-navigation-close left"></i>Unsure, will decide later</a>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>;
	}
};
