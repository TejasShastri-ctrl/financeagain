// // reducers/expenseReducer.js (create a new file or use your existing one)
// import { ADD_EXPENSE, FETCH_EXPENSES } from './ActionType';

// const initialState = {
//     expenses: [],
// };

// export const expenseReducer = (state = initialState, { type, payload }) => {
//     switch (type) {
//         case ADD_EXPENSE:
//             //! Thinking of doing it another way
//             // return { ...state, expenses: [...state.expenses, payload] }; // Add new expense to the array
//         case FETCH_EXPENSES:
//             return {...state, expenses:payload};
//         default:
//             return state;
//     }
// };
