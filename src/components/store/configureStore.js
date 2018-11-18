import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../../reducers/index';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(reduxImmutableStateInvariant()) // throw error messages when you try to mutate the state
  );
}
