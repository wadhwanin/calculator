import { createStore, applyMiddleware, compose, combineReducers} from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import browserHistory from 'react-router/lib/browserHistory';
import createLogger from 'redux-logger';
import input from '../reducer/input';
import output from '../reducer/output';

const rootReducer = combineReducers({ input, output});

const finalCreateStore = compose(
  applyMiddleware(thunk),
  applyMiddleware(routerMiddleware(browserHistory)),
  applyMiddleware(createLogger({ collapsed: true }))
)(createStore);

export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState);
}
