import { LOGIN, LOGOUT, REGISTER, ADD_EXPENSE, FETCH_EXPENSES, DELETE_EXPENSE, UPDATE_PROFILE_PICTURE, UPDATE_COMPANY, UPDATE_PROFESSION, UPDATE_ABOUT_YOURSELF } from './ActionType'; // Adjust the path as necessary

const initialState = {
    currUser: null,
    expenses: []
};

export const userReducer = (store = initialState, { type, payload }) => {
    switch (type) {
        case REGISTER:
            return { ...store, currUser: payload };
        case LOGIN:
            return { ...store, currUser: payload };
        case LOGOUT:
            return { ...store, currUser: null };
        case ADD_EXPENSE:
            return { ...store };
        case FETCH_EXPENSES:
            return { ...store, expenses: payload };
        case DELETE_EXPENSE:
            return {
                ...store,
                expenses: store.expenses.filter(expense => expense.id !== payload)
            };

        case UPDATE_PROFILE_PICTURE:
            return { 
                ...store, 
                currUser: { 
                    ...store.currUser, 
                    profilePicUrl: payload.profilePicUrl
                } 
            };
        case UPDATE_PROFESSION:
            return { 
                ...store, 
                currUser: { 
                    ...store.currUser, 
                    profession: payload.profession
                } 
            };
        
        case UPDATE_COMPANY:
            return { 
                ...store, 
                currUser: { 
                    ...store.currUser, 
                    company: payload.company
                } 
            };
        case UPDATE_ABOUT_YOURSELF:
            return { 
                ...store, 
                currUser: { 
                    ...store.currUser, 
                    aboutYourself: payload.aboutYourself
                } 
            };
        default:
            return store;
    }
};
