import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import registerServiceWorker from './registerServiceWorker';
import './style/index.css';
import './style/TodoApp.css'
import './actions/todos'
import todoApp from './actions/todos';

const store = createStore(todoApp);

const Link = ({
	active,
	children,
	onClick
}) => {

	if(active) {
		return <span> {children} </span>;
	}

	return (
		<a href='#'
			onClick={e => {
				e.preventDefault();
				onClick();
			}}
		>
			{children}
		</a>
	);
};

class FilterLink extends Component {
	componentDidMount() {
		this.unsubscribe = store.subscribe(() => 
			this.forceUpdate()
		);
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	render() {
		const props = this.props;
		const state = store.getState();

		return (
			<Link 
				active={
					props.filter === 
					state.visibilityFilter
				}
				onClick={() => 
					store.dispatch({
						type: 'SET_VISIBILITY_FILTER',
						filter: props.filter
					})
				}
			>
				{props.children}
			</Link>
		);
	}
}

const Footer = () => (
	<div className='options-container'>
		<p>
			Filter:
			{' '}
			<FilterLink 
				filter='SHOW_ALL'
			>
				All
			</FilterLink>
			{', '}
			<FilterLink
				filter='SHOW_ACTIVE'
			>
				Active
			</FilterLink>
			{', '}
			<FilterLink
				filter='SHOW_COMPLETED'
			>
				Completed
			</FilterLink>
		</p>
	</div>
);

const Todo = ({
	onClick,
	completed,
	text
}) => (
	<div className='item-button'>
		<p className='item'
			onClick={onClick}
			style={{textDecoration: completed ? 'line-through' : 'none'}}
		>
			{text}
		</p>
		<button className='delete-todo'>
			X
		</button>
	</div>
);

const TodoList = ({
	todos,
	onTodoClick
}) => (
	<div className='item-container'>
		<ul>
			{todos.map(todo =>
				<Todo
					key={todo.id}
					{...todo}
					onClick={() => onTodoClick(todo.id)}
				/>
			)}
		</ul>
	</div>
);

const AddTodo = () => {
	let input;
	return(
		<div className='insert-bar'>
			<input ref={node => {
				input = node;
			}}
				className='insert-task' type="text" placeholder='Insert your task here'
			/>
			<button onClick={() => { 
				store.dispatch({
					type: 'ADD_TODO',
					id: nextTodoId++,
					text: input.value
				})
				input.value = '';
			}}>Add</button>
		</div>
	);
};

const getVisibleTodos = (
	todos,
	filter
) => {
	switch (filter){
		case 'SHOW_ALL':
			return todos;

		case 'SHOW_COMPLETED':
			return todos.filter(t => t.completed);

		case 'SHOW_ACTIVE':
			return todos.filter(t => !t.completed);
		
		default:
			return todos;
	}
};

class VisibleTodoList extends Component {
	componentDidMount() {
		this.unsubscribe = store.subscribe(() => 
			this.forceUpdate()
		);
	}

	componentWillUnmount() {
		this.unsubscribe();
	}

	render() {
		const props = this.props;
		const state = store.getState();

		return (
			<TodoList 
				todos={
					getVisibleTodos(
						state.todos,
						state.visibilityFilter
					)
				}
				onTodoClick={id =>
					store.dispatch({
						type: 'TOGGLE_TODO',
						id
					})
				}
			/>
		);
	}
}

let nextTodoId = 0;

const TodoApp = () => (
	<div className='todolist-container'>

		<h1>To-Do List</h1>
		<AddTodo />
		<VisibleTodoList/>
		<Footer />

	</div>
);

ReactDOM.render(
	<TodoApp />,
	document.getElementById('root')
);

registerServiceWorker();