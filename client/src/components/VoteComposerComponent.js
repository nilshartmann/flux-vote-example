// --------------------------------------------------------------------------------------
// ---
// ---
// ---
// --------------------------------------------------------------------------------------
// --- Copyright (c) 2015 Nils Hartmann (http://nilshartmann.net).
// -------------------------------------------------------------------------------------
"use strict";

import React from '../../libs/bower/react/react';
import VoteComposerActionsCreator from '../actions/VoteComposerActionsCreator'

export default class VoteComposerComponent extends React.Component {

	constructor(props) {
		super(props);

		this.state = VoteComposerComponent._emptyState();
	}

	static _emptyState() {
		return {
			active:        false,
			title:         '',
			description:   '',
			choices:       [{
				id:    'choice_0',
				title: ''
			}],
			formCompleted: false
		};
	}

	_cancel() {
		this.setState(VoteComposerComponent._emptyState());
	}

	_save() {

		console.log("CHOICES: ", this.state.choices);
		const ba = this.state.choices.slice(0, -1);
		console.log("hinterher: ", ba);

		const newVote = {
			title:       this.state.title,
			description: this.state.description,
			choices: this.state.choices.slice(0, -1)
		};
		VoteComposerActionsCreator.addVote(newVote);
		this.setState(VoteComposerComponent._emptyState());
	}

	_activateIfNeeded() {
		if (!this.state.active) {
			this.state.active = true;
			this._updateState(this.state);
		}
	}

	_updateState(newState) {
		let formCompleted = newState.active && newState.title && newState.description && newState.choices.length > 1;

		if (formCompleted) {
			formCompleted = newState.choices.every(function (c, ix) {
				return c.title || ix === (newState.choices.length - 1);
			});
		}

		newState.formCompleted = formCompleted;
		this.setState(newState);
	}

	_onChange(event, value) {
		const fieldName = event.target.name;

		this.state[fieldName] = event.target.value;
		this._updateState(this.state);
	}

	_onChoiceChange(event) {
		const choiceIx = event.target.name.substr('choices_'.length);
		const oldTitle = this.state.choices[choiceIx].title;
		this.state.choices[choiceIx].title = event.target.value;

		// add a new, empty choice field if we're currently in the last choice and the choice
		// has been new (empty) before. In other words: after entering the first character to the current last
		// choice add the field for the next choice
		if (!oldTitle && this.state.choices[choiceIx].title && choiceIx == this.state.choices.length - 1) {
			this.state.choices.push({
				id:    'choice_' + (choiceIx + 1),
				title: ''
			});
		}

		this._updateState(this.state);
	}

	render() {
		let buttonBar;
		let choicesForm;
		let descriptionInput;

		if (this.state.active) {
			descriptionInput = (
				<div class="input-field col s6">
					<input key="description" placeholder="Tell your audience more about your vote" name="description"
								 style={{'border-bottom': 0}}
								 value={this.state.description} type="text" className="validate"
								 onChange={this._onChange.bind(this)}
								 onFocus={this._activateIfNeeded.bind(this)}>
					</input>
				</div>
			);

			choicesForm = (
				<div>
					{this.state.choices.map((c, ix) => {
						return <li className="collection-item" style={{'border-bottom': 0}}>
							<div className="row" style={{'marginBottom':'0'}}>
								<div className="col offset-s1 s9">
									<div class="input-field col s6">
										<input key={'choices_' + ix} placeholder={'Choice #'+(ix+1)} name={'choices_' + ix}
													 style={{'border-bottom': 0}}
													 type="text" className="validate"
													 onChange={this._onChoiceChange.bind(this)}
											>
										</input>
									</div>
								</div>
							</div>
						</li>
					})}
				</div>
			);

			buttonBar =
				<li className="collection-item">
					<div className="row" style={{'marginBottom':'0'}}>
						<div className="col offset-s1 s9">
							<a
								className={this.state.formCompleted?'waves-effect waves-light btn':'waves-effect waves-light btn disabled'}
								onClick={this.state.formCompleted?this._save.bind(this):null}><i
								className="mdi-content-add left"></i>Save</a>
							<a className="waves-effect waves-light btn-flat right" onClick={this._cancel.bind(this)}><i
								className="mdi-content-clear right"></i></a>
						</div>
					</div>
				</li>
			;
		}

		return (
			<div className="row">
				<div className={this.state.active?'col s12':'col s10 offset-s1'}>
					<ul className="collection with-header z-depth-1 ">
						<form>
							<li className="collection-header">
								<div class="input-field col s6">
									<input style={{'font-size':'1.64rem'}}
												 key="title" placeholder="What do you want to know?" name="title" value={this.state.title}
												 type="text" className="xvalidate"
												 onChange={this._onChange.bind(this)}
												 onFocus={this._activateIfNeeded.bind(this)}>
									</input>
								</div>
								{descriptionInput}
						</li>
							{choicesForm}
						{buttonBar}
						</form>
					</ul>
			</div>
			</div>
		);
	}
};
