import React from 'react';



class TodoListHeader extends React.Component{
	render(){
		return (
				<thead className="thead-dark">
					<tr>
						<th>Task</th>
						<th>Action</th>
					</tr>
				</thead>
		);
	}
}

export default TodoListHeader;
