import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';

import { userReducer } from './Reducer';
import { expenseReducer } from './ExpenseReducer';

const reducer = combineReducers({
    user: userReducer
    // expense: expenseReducer - I merged it with userreducer because why noy
});

const store = createStore(reducer, applyMiddleware(thunk)); //! Why is this deprecated?

export default store;
