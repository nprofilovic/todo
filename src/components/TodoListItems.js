import React from 'react';


class TodoListItems extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			isEditing: false
		}
	}

	renderTaskSection(){
		const { task, isCompleted } = this.props;

		const taskStyle = {
			color: isCompleted ? 'green' : 'red',
			cursor: 'pointer'
		}
		if(this.state.isEditing){
			return (
				<td>
					<form onSubmit={this.onSaveClick.bind(this)}>
						<div className="form-row">
							<input type="text" defaultValue={task} className="form-control"  ref="editInput" />
						</div>
					</form>
				</td>
			);
		}
		return(
			<td style={taskStyle}  onClick={this.props.toggleTask.bind(this, task)}>{task}</td>

		);


	}

	renderActionSection(){
		if (this.state.isEditing){
			return (
				<div>
					<button onClick={this.onSaveClick.bind(this)} className="btn btn-primary btn-block button">Save</button>
					<button onClick={this.onCancelClick.bind(this)} className="btn btn-primary btn-block button">Cancel</button>
				</div>
			);
		}
			return (
				<div>
					<button onClick={this.onEditClick.bind(this)} className="btn btn-primary button">Edit</button>
					<button onClick={this.props.deleteTask.bind(this, this.props.task)} className="btn btn-primary button">Delete</button>
				</div>
			);
	}

	render(){
		return (
			<tr>
				{this.renderTaskSection()}
				{this.renderActionSection()}

			</tr>
		);
	}

	onEditClick(){
		this.setState({
			isEditing: true
		});
	}

	onCancelClick(){
		this.setState({
			isEditing: false
		});
	}

	onSaveClick(event){
		event.preventDefault();

		const oldTask = this.props.task;
		const newTask = this.refs.editInput.value;
		this.props.saveTask(oldTask, newTask);
		this.setState({ isEditing: false });
	}


}

export default TodoListItems;
