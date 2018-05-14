import React, { Component } from 'react';
import { createStore } from 'redux';
import '../style/TodoApp.css'
import '../actions/todos'
import todoApp from '../actions/todos';

const store = createStore(todoApp);

let nextTodoId = 0;

class TodoApp extends Component {
	render() {
		return(
			<div className='todolist-container'>

			<h1>To-Do List</h1>
			<div className='insert-bar'>
					<input className='insert-task' type="text" placeholder='Insert your task here'/>
					<button onClick={() => { 
						store.dispatch({
							type: 'ADD_TODO',
							text: 'Test',
							id: nextTodoId++
						})
					}}>Add</button>
			</div>

			<div className='item-container'>
				<ul>
					{this.props.todos.map(todo => 
						<li key={todo.id}>
							{todo.text}
						</li>
					)}
				</ul>
			</div>

			<div className='options-container'>
				<p> Filter: </p>
				<p className='options'> All, </p>
				<p className='options'> Completed, </p>
				<p className='options'>Active</p>
			</div>

		</div>
		);
	}
}

export default TodoApp;