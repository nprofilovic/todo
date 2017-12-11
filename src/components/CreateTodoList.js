import React from 'react';
import _ from 'lodash';



class CreateTodoList extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			error: null
		}
	}

	renderError(){
		if(!this.state.error){return null;}
		return <div className="alert alert-danger error" role="alert">{this.state.error}</div>;
	}

	render(){
		return (

				<form onSubmit={this.handleCreate.bind(this)}>
					 <div className="form-row align-items-center">
						 	<div className="col-sm-9">
								<input type="text" placeholder="What do I need to do?" ref="createInput" className="form-control"/>
							</div>
							<div className="col-sm-3">
								<button className="btn btn-primary btn-block">Create</button>
							</div>
							<div className="col-sm-12">
								{this.renderError()}
							</div>
					 </div>
				</form>


		);
	}

	handleCreate(event){
		event.preventDefault();

		const createInput = this.refs.createInput;
		const task = createInput.value;
		const valideteInput = this.valideteInput(task);

		if(valideteInput) {
			this.setState({error:valideteInput});
			return;
		}
		this.setState({error: null});

		this.props.createTask(task);
		this.refs.createInput.value = '';
	}
	valideteInput(task){
		if(!task){
			return 'Please enter a task.';

		}else if (_.find(this.props.todos, todo => todo.task === task)) {
			return 'Task already exists.';
		}else {
			return null;
		}

	}
}

export default CreateTodoList;
