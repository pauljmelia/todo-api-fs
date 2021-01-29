import moment from 'moment';
import { api } from '../../api';
import { deleteData, fetchData, postData, putData } from '../../utils';
import {
  ADD_TODO_BEGIN,
  ADD_TODO_FAILURE,
  ADD_TODO_SUCCESS,
  DELETE_TODO_BEGIN,
  DELETE_TODO_FAILURE,
  DELETE_TODO_SUCCESS,
  FETCH_TODOS_BEGIN,
  FETCH_TODOS_FAILURE,
  FETCH_TODOS_SUCCESS,
  TOGGLE_TODO_IS_COMPLETE_BEGIN,
  TOGGLE_TODO_IS_COMPLETE_FAILURE,
  TOGGLE_TODO_IS_COMPLETE_SUCCESS,
  UPDATE_TODO_BEGIN,
  UPDATE_TODO_FAILURE,
  UPDATE_TODO_SUCCESS,
} from './actionTypes';

const addTodoBegin = () => ({
  type: ADD_TODO_BEGIN,
});

const addTodoFailure = (error) => ({
  type: ADD_TODO_FAILURE,
  payload: {
    error,
  },
});

const addTodoSuccess = (todo) => ({
  type: ADD_TODO_SUCCESS,
  payload: {
    todo,
  },
});

const toggleTodoIsCompleteBegin = () => ({
  type: TOGGLE_TODO_IS_COMPLETE_BEGIN,
});

const toggleTodoIsCompleteFailure = (error) => ({
  type: TOGGLE_TODO_IS_COMPLETE_FAILURE,
  payload: {
    error,
  },
});

const toggleTodoIsCompleteSuccess = (id, isComplete) => ({
  type: TOGGLE_TODO_IS_COMPLETE_SUCCESS,
  payload: {
    id,
    isComplete,
  },
});

const deleteTodoBegin = () => ({
  type: DELETE_TODO_BEGIN,
});

const deleteTodoFailure = (error) => ({
  type: DELETE_TODO_FAILURE,
  payload: {
    error,
  },
});

const deleteTodoSuccess = (id) => ({
  type: DELETE_TODO_SUCCESS,
  payload: {
    id,
  },
});

const fetchTodosBegin = () => ({
  type: FETCH_TODOS_BEGIN,
});

const fetchTodosFailure = (error) => ({
  type: FETCH_TODOS_FAILURE,
  payload: {
    error,
  },
});

const fetchTodosSuccess = (todos) => ({
  type: FETCH_TODOS_SUCCESS,
  payload: {
    todos,
  },
});

const updateTodoBegin = () => ({
  type: UPDATE_TODO_BEGIN,
});

const updateTodoFailure = (error) => ({
  type: UPDATE_TODO_FAILURE,
  payload: { error },
});

const updateTodoSuccess = (id, todo) => ({
  type: UPDATE_TODO_SUCCESS,
  payload: {
    id,
    todo,
  },
});

const addTodo = (title, description) => async (dispatch, getState) => {
  const {
    authentication: { token, tokenExpiry },
  } = getState();

  if (!(title || description)) {
    throw new Error('Invalid todo');
  }

  if (!(token && moment(tokenExpiry).isAfter(moment()))) {
    throw new Error('Invalid token');
  }

  dispatch(addTodoBegin());

  try {
    const url = api.todos.add;
    const response = await postData(url, { title, description }, token);
    const todo = response.value;
    dispatch(addTodoSuccess(todo));

    return todo;
  } catch (ex) {
    const message = ex.message || ex;
    dispatch(addTodoFailure(message));
    throw ex;
  }
};

const toggleTodoIsComplete = (id, isComplete) => async (dispatch, getState) => {
  const {
    authentication: { token, tokenExpiry },
  } = getState();

  if (!id) {
    throw new Error('Invalid todo');
  }

  if (!(token && moment(tokenExpiry).isAfter(moment()))) {
    throw new Error('Invalid token');
  }

  dispatch(toggleTodoIsCompleteBegin());

  try {
    const url = api.todos.toggleIsComplete(id);
    await putData(url, { value: isComplete }, token);
    dispatch(toggleTodoIsCompleteSuccess(id, isComplete));

    return true;
  } catch (ex) {
    const message = ex.message || ex;
    dispatch(toggleTodoIsCompleteFailure(message));
    throw ex;
  }
};

const deleteTodo = (id) => async (dispatch, getState) => {
  const {
    authentication: { token, tokenExpiry },
  } = getState();

  if (!id) {
    throw new Error('Invalid todo');
  }

  if (!(token && moment(tokenExpiry).isAfter(moment()))) {
    throw new Error('Invalid token');
  }

  dispatch(deleteTodoBegin());

  try {
    const url = api.todos.delete(id);
    const response = await deleteData(url, token);
    const todo = response.value;
    dispatch(deleteTodoSuccess(id));

    return todo;
  } catch (ex) {
    const message = ex.message || ex;
    dispatch(deleteTodoFailure(message));
    throw ex;
  }
};

const updateTodo = (id, title, description, isComplete) => async (dispatch, getState) => {
  const {
    authentication: { token, tokenExpiry },
  } = getState();

  if (!(id && (title || description))) {
    throw new Error('Invalid todo');
  }

  if (!(token && moment(tokenExpiry).isAfter(moment()))) {
    throw new Error('Invalid token');
  }

  dispatch(updateTodoBegin());

  try {
    const url = api.todos.update(id);
    await postData(url, { title, description, isComplete }, token);
    const todo = { id, title, description, isComplete };
    dispatch(updateTodoSuccess(todo));

    return todo;
  } catch (ex) {
    const message = ex.message || ex;
    dispatch(updateTodoFailure(message));
    throw ex;
  }
};

const fetchTodos = () => async (dispatch, getState) => {
  const {
    authentication: { token, tokenExpiry },
  } = getState();

  if (!(token && moment(tokenExpiry).isAfter(moment()))) {
    throw new Error('Invalid token');
  }

  dispatch(fetchTodosBegin());

  try {
    const url = api.todos.list;
    const response = await fetchData(url, token);
    const todos = response;
    dispatch(fetchTodosSuccess(todos));

    return todos;
  } catch (ex) {
    const message = ex.message || ex;
    dispatch(fetchTodosFailure(message));
    throw ex;
  }
};

export const actionCreators = {
  addTodo,
  deleteTodo,
  updateTodo,
  fetchTodos,
  toggleTodoIsComplete,
};
