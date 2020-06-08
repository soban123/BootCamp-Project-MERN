import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

import { authReducer, receiptReducer, userReducer } from './Reducers';

const middleware = applyMiddleware(thunk);
const rootReducer = combineReducers({ userReducer, authReducer, receiptReducer });

let store = createStore(rootReducer, middleware);

export default store;
