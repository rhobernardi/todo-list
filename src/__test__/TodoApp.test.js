import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from '../components/TodoApp';
import { todos } from '../actions/todos'

it('Adding todo', () => {
    const stateBefore = [];
    
    const action = {
        type: 'ADD_TODO',
        id: 0,
        text: 'Learn Redux'
    };
    
    const stateAfter = 
    [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        }
    ];

	expect(
        todos(stateBefore, action)
    ).toEqual(stateAfter);
});

it('Toggling todo', () => {
    const stateBefore = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        },
        {
            id: 1,
            text: 'Go Shopping',
            completed: false
        }
    ];
    
    const action = {
        type: 'TOGGLE_TODO',
        id: 1,
    };
    
    const stateAfter = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        },
        {
            id: 1,
            text: 'Go Shopping',
            completed: true
        }
    ];

	expect(
        todos(stateBefore, action)
    ).toEqual(stateAfter);
});

// it('Deleting todo', () => {
//     const stateBefore = [
//         {
//             id: 0,
//             text: 'Learn Redux',
//             completed: false
//         },
//         {
//             id: 1,
//             text: 'Go Shopping',
//             completed: false
//         },
//         {
//             id: 2,
//             text: 'Go walk',
//             completed: false
//         }
//     ];
    
//     const action = {
//         type: 'DELETE_TODO',
//         id: 1
//     };
    
//     const stateAfter = [
//         {
//             id: 0,
//             text: 'Learn Redux',
//             completed: false
//         },
//         {
//             id: 2,
//             text: 'Go walk',
//             completed: false
//         }
//     ];

// 	expect(
//         todos(stateBefore, action)
//     ).toEqual(stateAfter);
// });