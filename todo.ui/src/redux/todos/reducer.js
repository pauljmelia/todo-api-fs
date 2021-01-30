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

export const defaultState = {
  adding: false,
  deleting: false,
  error: null,
  fetching: false,
  todos: [],
  toggling: false,
  updating: false,
};

export const reducer = (state = defaultState, action) => {
  if (!action?.type) {
    return { ...state };
  }

  switch (action.type) {
    case ADD_TODO_BEGIN: {
      return { ...state, error: null, adding: true };
    }
    case ADD_TODO_FAILURE: {
      const { error } = action.payload;

      return { ...state, error, adding: false };
    }
    case ADD_TODO_SUCCESS: {
      return { ...state, error: null, adding: false };
    }
    case DELETE_TODO_BEGIN: {
      return { ...state, error: null, deleting: true };
    }
    case DELETE_TODO_FAILURE: {
      const { error } = action.payload;

      return { ...state, error, deleting: false };
    }
    case DELETE_TODO_SUCCESS: {
      const { id } = action.payload;
      const { todos } = state;
      const todo = todos.find((t) => t.id === id);
      const index = todos.indexOf(todo);
      todos.splice(index, 1);

      return { ...state, todos, error: null, deleting: false };
    }
    case FETCH_TODOS_BEGIN: {
      return { ...state, fetching: true, error: null };
    }
    case FETCH_TODOS_FAILURE: {
      const { error } = action.payload;

      return { ...state, fetching: false, error };
    }
    case FETCH_TODOS_SUCCESS: {
      const { todos } = action.payload;

      return { ...state, todos, fetching: false, error: null };
    }
    case TOGGLE_TODO_IS_COMPLETE_BEGIN: {
      return { ...state, toggling: true, error: null };
    }
    case TOGGLE_TODO_IS_COMPLETE_FAILURE: {
      const { error } = action.payload;

      return { ...state, toggling: false, error };
    }
    case TOGGLE_TODO_IS_COMPLETE_SUCCESS: {
      const { id, isComplete } = action.payload;
      const { todos } = state;
      const todo = todos.find((t) => t.id === id);
      todo.isComplete = isComplete;

      return { ...state, todos, error: null, toggling: false };
    }
    case UPDATE_TODO_BEGIN: {
      return { ...state, updating: true, error: null };
    }
    case UPDATE_TODO_FAILURE: {
      const { error } = action.payload;

      return { ...state, error, updating: false };
    }
    case UPDATE_TODO_SUCCESS: {
      const { id, title, description, isComplete } = action.payload;
      const { todos } = state;
      const todo = todos.find((t) => t.id === id);
      todo.description = description;
      todo.isComplete = isComplete;
      todo.title = title;

      return { ...state, todos, error: null, updating: false };
    }
    default:
      return { ...state };
  }
};
