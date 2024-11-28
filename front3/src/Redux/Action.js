import { LOGIN, REGISTER } from "./ActionType";
import { BASE_API_URL } from '../Config/api';
import { ADD_EXPENSE } from "./ActionType";
import { LOGOUT } from "./ActionType";
import { FETCH_EXPENSES } from "./ActionType";
import { DELETE_EXPENSE } from "./ActionType";
import { UPDATE_ABOUT_YOURSELF } from "./ActionType";
import { UPDATE_PROFESSION } from "./ActionType";
import { UPDATE_PROFILE_PICTURE } from "./ActionType";
import { UPDATE_COMPANY } from "./ActionType";

export const register = (data) => async (dispatch) => {
    try {
        const res = await fetch(`http://localhost:8080/api/users/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Registration failed");
        }

        const resData = await res.json();
        console.log('registering user', resData);
        dispatch({ type: REGISTER, payload: resData });
        localStorage.setItem("userData", JSON.stringify(resData));
    } catch (error) {
        console.log('error signup:', error);
        throw error;
    }
};

// New Login Action
export const login = (data) => async (dispatch) => {
    const { email, password } = data;
    try {
        const res = await fetch(`http://localhost:8080/api/users/login?email=${email}&password=${password}`, {
            method: "GET", // Change to GET since we are now using URL parameters
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Login failed");
        }

        const resData = await res.json();
        console.log('Logging in user', resData);
        dispatch({ type: LOGIN, payload: resData });
        localStorage.setItem("userData", JSON.stringify(resData));
    } catch (error) {
        console.log('error login:', error);
        throw error;
    }
};

export const addExpense = (userId, expenseData) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_API_URL}/api/finance/addExpense/${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(expenseData), // Send only the expense data, userId is in the URL
        });

        const responseText = await res.text();
        if (!res.ok) {
            let errorMessage;
            try {
                const errorData = JSON.parse(responseText);
                errorMessage = errorData.message || "Failed to add expense";
            } catch {
                errorMessage = responseText;
            }
            throw new Error(errorMessage);
        }
        const resData = JSON.parse(responseText);
        console.log('Expense added:', resData);
        dispatch({ type: ADD_EXPENSE, payload: resData });
        dispatch(fetchExpenses(userId));
        return resData; //no need tho
    } catch (error) {
        console.error('Error adding expense:', error);
        throw error;
    }
};

export const deleteExpense = (userId, expenseId) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_API_URL}/api/finance/delete/${userId}/${expenseId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to delete expense");
        }

        const resData = await res.json();
        console.log('Expense deleted:', resData);
        dispatch({ type: DELETE_EXPENSE, payload: expenseId });
        dispatch(fetchExpenses(userId)); //
    } catch (error) {
        console.error('Error deleting expense:', error);
        throw error;
    }
};

export const fetchExpenses = (userId) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_API_URL}/api/finance/getExpenseBy/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            const errorData = await res.json(); // Parse the error response
            throw new Error(errorData.message || "Failed to fetch expenses");
        }

        const resData = await res.json(); // Parse the response data
        console.log('Expenses fetched:', resData);
        dispatch({ type: FETCH_EXPENSES, payload: resData }); // Dispatch the expenses data
    } catch (error) {
        console.error('Error fetching expenses:', error);
        throw error; // Rethrow the error to be handled in the calling function
    }
};

export const updateProfilePicture = (userId, profilePicUrl) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_API_URL}/api/users/updateProfilePicture/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ profilePicUrl }), // Send the URL for the profile picture
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to update profile picture");
        }

        const resData = await res.json();
        console.log('Profile picture updated:', resData);
        dispatch({ type: UPDATE_PROFILE_PICTURE, payload: resData });
    } catch (error) {
        console.error('Error updating profile picture:', error);
        throw error;
    }
};

export const updateProfession = (email, profession) => async (dispatch) => {
    try {
        const res = await fetch(
            `${BASE_API_URL}/api/users/updateProfession?email=${encodeURIComponent(email)}&profession=${encodeURIComponent(profession)}`, 
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to update profession");
        }

        // console.log('WHAT', resData) - cant access without initialization you idiot
        const resData = await res.json();
        console.log('Profession updated:', resData);
        dispatch({ type: UPDATE_PROFESSION, payload: resData });
    } catch (error) {
        console.error('Error updating profession:', error);
        throw error;
    }
};

export const updateCompany = (email, company) => async (dispatch) => {
    try {
        const res = await fetch(
            `${BASE_API_URL}/api/users/updateCompany?email=${encodeURIComponent(email)}&company=${encodeURIComponent(company)}`, 
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to update profession");
        }

        // console.log('WHAT', resData) - cant access without initialization you idiot
        const resData = await res.json();
        console.log('Work place updated:', resData);
        dispatch({ type: UPDATE_COMPANY, payload: resData });
    } catch (error) {
        console.error('Error updating work place:', error);
        throw error;
    }
};

// Update About Yourself
export const updateAboutYourself = (email, about) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_API_URL}/api/users/updateProfession?email=${encodeURIComponent(email)}&about=${encodeURIComponent(about)}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ about }), // Send the updated 'about yourself' text
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to update 'About Yourself'");
        }

        const resData = await res.json();
        console.log('About Yourself updated:', resData);
        dispatch({ type: UPDATE_ABOUT_YOURSELF, payload: resData });
    } catch (error) {
        console.error('Error updating About Yourself:', error);
        throw error;
    }
};



// Logout Action
export const logout = () => (dispatch) => {
    localStorage.removeItem("userData"); // Clear user data from localStorage
    dispatch({ type: LOGOUT }); // Dispatch LOGOUT action to clear user state in Redux
};