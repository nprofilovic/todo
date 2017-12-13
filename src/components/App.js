import React from 'react';
import TodoList from './TodoList';
import CreateTodoList from './CreateTodoList';
import _ from 'lodash';
import {config} from '../base';
import firebase from 'firebase/app';
import 'firebase/database';



class App extends React.Component{
	constructor(props){
		super(props);
		this.deleteTask = this.deleteTask.bind(this);
		this.saveTask = this.saveTask.bind(this);
		this.toggleTask = this.toggleTask.bind(this);
		this.createTask = this.createTask.bind(this);
		this.app = firebase.initializeApp(config);
    	this.database = this.app.database().ref().child('todos');
		this.state = {
			todos:[]
			
		}
	}
	componentWillMount(){
    const previousTodos = this.state.todos;

    this.database.on('child_added', snap => {
      previousTodos.push({
        id: snap.key,
        task: snap.val().todos,

		isCompleted: false


      })
			
      this.setState({
        todos: previousTodos
      })
    })


  }
  	componentWillUpdate(){

	}

	componentWillUnmount() {
		var previousTodos = this.state.todos;
    	this.database.on('child_removed', snap => {
    	previousTodos = previousTodos.filter((x) => x.id !== snap.key);
    	this.setState({
    		todos: previousTodos
    	})
    })
    	
  }
  
  	toggleTask(task){
		const foundTodo = _.find(this.state.todos, todo => todo.task === task);
		foundTodo.isCompleted = !foundTodo.isCompleted;
		this.setState({todo: this.state.todos});
	}

	createTask(task){
		this.database.push().set({todos: task, isCompleted: false});
		this.setState({todos: this.state.todos});
	}

	saveTask(oldTask, newTask){
		const foundTodo = _.find(this.state.todos, todo => todo.task === oldTask);
		foundTodo.task = newTask;
		this.setState({todos: this.state.todos});
	}

 	deleteTask(taskToDelete){
    	this.database.child().remove();
	 	

	}

	render(){
		return (
			<div className="App">

					<h1 className="display-2">React ToDos App</h1>

						<CreateTodoList todo={this.state.todos} createTask={this.createTask.bind(this)} />
					<div className="Centar">
					<TodoList
						todos = {this.state.todos}
						toggleTask = {this.toggleTask}
						saveTask = {this.saveTask}
						deleteTask = {this.deleteTask}

					/>
					</div>
			</div>
		);
	}
	


}

export default App;
