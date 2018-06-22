import { createStore, compose, applyMiddleware } from 'redux';
import rootReducers from './reducers';
import thunk from 'redux-thunk';

const defaultState = {
  talks: {
    data: {
      docs: [],
    },
    loading: false,
    messages: {
      errors: null,
      success: null,
    },
    total: 0,
    totalHours: 0,
  },
  rooms: {
    data: {
      docs: [],
    },
  },
};

const persistedState = { ...defaultState };

const enhacers = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
);

const store = createStore(rootReducers, persistedState, enhacers);

if (module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
