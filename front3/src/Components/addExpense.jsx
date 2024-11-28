
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense, fetchExpenses } from '../Redux/Action'; // Ensure both actions are imported
import {
    TextField,
    Button,
    Grid,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material'; // Added missing imports for FormControl, InputLabel, Select, MenuItem
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AddExpense = () => {
    const dispatch = useDispatch();
    const currUser = useSelector((state) => state.user.currUser); // Get the current user from the Redux store
    const navigate = useNavigate(); // Initialize useNavigate

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dateString = formData.date.toISOString().split('T')[0]; // Convert date to YYYY-MM-DD format
            const expenseData = { ...formData, date: dateString };

            // Use currUser.id to get the userId
            await dispatch(addExpense(currUser.id, expenseData)); // Pass userId from currUser

            // Optionally, you can navigate or reset the form here
        } catch (error) {
            console.error('Error adding expense:', error);
            alert('Failed to add expense: ' + error.message);
        }
    };

    // Back button click handler
    const handleBack = () => {
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 p-4">
            <Typography variant="h4" gutterBottom>Add Expense</Typography>
            <Button variant="outlined" color="secondary" onClick={handleBack} sx={{ marginBottom: 2 }}>
                Back
            </Button>
            <form onSubmit={handleSubmit} className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Amount"
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Description"
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Select Date"
                                value={formData.date}
                                onChange={handleDateChange}
                                renderInput={(params) => <TextField {...params} fullWidth required />}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth required>
                            <InputLabel>Category Name</InputLabel>
                            <Select
                                name="catName"
                                value={formData.catName}
                                onChange={handleChange}
                            >
                                <MenuItem value="rent">Rent</MenuItem>
                                <MenuItem value="food">Food</MenuItem>
                                <MenuItem value="utility">Utility</MenuItem>
                                <MenuItem value="education">Education</MenuItem>
                                <MenuItem value="medical">Medical</MenuItem>
                                <MenuItem value="miscellaneous">Miscellaneous</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
                    Add Expense
                </Button>
            </form>

        </div>
    );
};

export default AddExpense;