import React from 'react';
import TodoListHeader from './TodoListHeader';
import _ from 'lodash';
import TodoListItems from './TodoListItems';


class TodoList extends React.Component{

	renderItems(){
		const props = _.omit(this.props,'todos');

		return _.map(this.props.todos, (todo, i) => <TodoListItems  key={i} {...todo} {...props} />);
	}


	render(){
		return (

			<table className="table table-hover">
				<TodoListHeader />
				<tbody>
					{this.renderItems()}
				</tbody>
			</table>

		);
	}
}

export default TodoList;
