// what even is the fucking point. I will never be what I wanted to be. My destiny is written and I get closer to it everyday.
// what is the point in fighting so much.
import ExpenseCard from './expenseCard';

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense, fetchExpenses, deleteExpense } from '../Redux/Action'; // Ensure both actions are imported
import { TextField, Button, Grid, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const ViewExpenses = () => {
    const dispatch = useDispatch();
    const currUser = useSelector((state) => state.user.currUser);
    const navigate = useNavigate();

    const expenses = useSelector((state) => state.user.expenses) || [];

    console.log('Redux expenses state:', expenses);

    const handleBack = () => {
        navigate(-1);
    };

    // Regarding left section
    useEffect(() => {
        if (currUser) {
            dispatch(fetchExpenses(currUser.id));
        }
    }, [dispatch, currUser]);

    const handleDelete = (expenseId) => {
        dispatch(deleteExpense(currUser.id, expenseId));
    };

    const groupExpensesByMonth = (expenses) => {
        return expenses.reduce((grouped, expense) => {
            const [year, day, month] = expense.date.split('-');
            //month is 0-indexed
            const expenseDate = new Date(year, month - 1, day);

            const monthKey = expenseDate.toLocaleString('default', { month: 'long' }) + ' ' + expenseDate.getFullYear();
            console.log(`Expense ID: ${expense.id}, Date: ${expense.date}, Month: ${monthKey}`);
            if (!grouped[monthKey]) {
                grouped[monthKey] = [];
            }
            grouped[monthKey].push(expense);
            return grouped;
        }, {});
    };

    // Regarding right section
    const [formData, setFormData] = useState({
        amount: '',
        description: '',
        date: new Date(),
        catName: ''
    });

    // Fetch expenses when the component mounts
    useEffect(() => {
        dispatch(fetchExpenses(currUser.id)); // Fetch expenses for the current user
    }, [dispatch, currUser.id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleDateChange = (newDate) => {
        setFormData({
            ...formData,
            date: newDate
        });
    };

    // tried fixing the expense.reduce issue
    const [flag, setFlag] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dateString = formData.date.toISOString().split('T')[0];
            const expenseData = { ...formData, date: dateString };
            await dispatch(addExpense(currUser.id, expenseData));
        } catch (error) {
            console.error('Error adding expense:', error);
            alert('Failed to add expense: ' + error.message);
        }
    };

    const groupedExpenses = groupExpensesByMonth(expenses);
    console.log('grouped expenses by month : ', groupedExpenses);

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 p-4">
            {/* Left Section for Expenses */}
            <div className="flex-1 p-8">
                <Typography variant="h4" className="text-white font-bold mb-4">Your Expenses</Typography>
                <div className="space-y-8 pt-6">
                    {Object.keys(groupedExpenses).length > 0 ? (
                        Object.keys(groupedExpenses).map((month) => (
                            <div key={month}>
                                {/* Month heading */}
                                <Typography variant="h5" className="text-white mb-2">
                                    {month}
                                </Typography>
                                {/* Expenses for that month */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                                    {groupedExpenses[month].map((expense) => (
                                        <ExpenseCard key={expense.id} expense={expense} onDelete={handleDelete} />
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <Typography className="text-white">No expenses found.</Typography>
                    )}
                </div>
                <div className="mt-8">
                    <button
                        onClick={handleBack}
                        className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-semibold rounded-lg shadow-md transition"
                    >
                        Back
                    </button>
                </div>
            </div>

            {/* Right Section */}
            <div className="md:flex md:flex-col md:w-[28%] p-8 bg-white rounded-lg shadow-lg">
                <Typography variant="h5" className="text-gray-700 mb-4">Add Expense here</Typography>

                <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg w-full">
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <label className="block mb-2 text-white" htmlFor="amount">Amount</label>
                            <input
                                type="number"
                                id="amount"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                className="px-4 py-2 w-full bg-gray-700 text-white rounded"
                                placeholder="Enter amount"
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <label className="block mb-2 text-white" htmlFor="description">Description</label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="px-4 py-2 w-full bg-gray-700 text-white rounded"
                                placeholder="Enter description"
                                required
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <label className="block mb-2 text-white" htmlFor="date">Select Date</label>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Select Date"
                                    value={formData.date}
                                    onChange={handleDateChange}
                                    renderInput={(params) => (
                                        <TextField {...params} fullWidth required className="bg-gray-700 text-white rounded" />
                                    )}
                                />
                            </LocalizationProvider>
                        </Grid>

                        <Grid item xs={12}>
                            <label className="block mb-2 text-white" htmlFor="catName">Category Name</label>
                            <input
                                type="text"
                                id="catName"
                                name="catName"
                                value={formData.catName}
                                onChange={handleChange}
                                className="px-4 py-2 w-full bg-gray-700 text-white rounded"
                                placeholder="Enter category"
                                required
                            />
                        </Grid>
                    </Grid>

                    <button type="submit" className="w-full bg-teal-500 hover:bg-teal-400 text-white font-semibold py-2 rounded transition mt-4">
                        Add Expense
                    </button>
                </form>
            </div>



        </div>
    );
};

export default ViewExpenses;
