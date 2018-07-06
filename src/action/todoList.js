import { createAction } from 'redux-actions';
//创建生成action
export const addTodo = createAction('ADD_TODO');
export const delTodo = createAction('DEL_TODO');
export const toggleTodo = createAction('TOGGLE_TODO');
export const setVisibility = createAction('SET_VISIBILITY');