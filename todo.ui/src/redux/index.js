import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';
import thunk from 'redux-thunk';
import { defaultState, reducers } from './reducers';

const rootPersistConfig = {
  key: 'todo-root',
  storage,
};

export default (initialState = defaultState) => {
  const middleware = [
    thunk,
    createLogger({
      predicate: () => process.env.NODE_ENV === 'development',
      collapsed: true,
    }),
  ];

  const rootReducer = combineReducers({
    ...reducers,
  });

  const enhancers = [];

  const windowIfDefined = typeof window === 'undefined' ? null : window;

  if (windowIfDefined && windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(windowIfDefined.__REDUX_DEVTOOLS_EXTENSION__());
  }

  const persistedRootReducer = persistReducer(rootPersistConfig, rootReducer);

  const store = createStore(persistedRootReducer, initialState, compose(applyMiddleware(...middleware), ...enhancers));

  const persistor = persistStore(store);

  return { store, persistor };
};
