import React from 'react';
import TodoList from './TodoList';
import CreateTodoList from './CreateTodoList';
import _ from 'lodash';
import {config} from '../base';
import firebase from 'firebase';
import 'firebase/database';



class App extends React.Component{
	constructor(props){
		super(props);
		this.app = firebase.initializeApp(config);
    this.database = this.app.database().ref().child('todos');
		this.state = {
			todos: [],
			task: []
		}
	}
	componentWillMount(){
    const previousTodos = this.state.todos;

    this.database.on('child_added', snap => {
      previousTodos.push({
        id: snap.key,
        todos: snap.val().todos,
				task: snap.val().task

      })
			


      this.setState({
        todos: previousTodos
      })
    })
  }

	render(){
		return (
			<div className="App">

					<h1 className="display-2">React ToDos App</h1>

						<CreateTodoList todo={this.state.todos} createTask={this.createTask.bind(this)} />
					<div className="Centar">
					<TodoList
						todos = {this.state.todos}
						toggleTask = {this.toggleTask.bind(this)}
						saveTask = {this.saveTask.bind(this)}
						deleteTask = {this.deleteTask.bind(this)}

					/>
					</div>
			</div>
		);
	}
	toggleTask(task){
		const foundTodo = _.find(this.state.todos, todo => todo.task === task);
		foundTodo.isCompleted = !foundTodo.isCompleted;
		this.setState({todo: this.state.todos});
	}

	createTask(task){
		this.database.push().set({todos: task});
		this.setState({todos: this.state.todos});
	}

	saveTask(oldTask, newTask){
		const foundTodo = _.find(this.state.todos, todo => todo.task === oldTask);
		foundTodo.task = newTask;
		this.setState({todos: this.state.todos});
	}

 	deleteTask(taskToDelete){
	 	_.remove(this.state.todos, todo => todo.task === taskToDelete);
	 	this.setState({ todos: this.state.todos });
	}


}

export default App;
