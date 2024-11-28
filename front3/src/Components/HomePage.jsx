import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, login, logout, addExpense } from '../Redux/Action'; // Ensure this path is correct

const HomePage = () => {
    const [isProfileVisible, setIsProfileVisible] = useState(false); // Manage profile visibility
    const navigate = useNavigate(); // Hook to navigate programmatically
    const currUser = useSelector((state) => state.user.currUser);

    console.log('This is the current User data : ', currUser);

    // Get user data from Redux store
    const user = useSelector((state) => state.user.currUser);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!currUser) {
            navigate('/login', { replace: true }); // Replace ensures no forward navigation
        }
    }, [currUser, navigate]);

    // Logout function
    const handleLogout = () => {
        dispatch(logout()); // Dispatch the logout action to clear user data
        navigate('/', { replace: true }); // Replace clears the current homepage from the history stack
    };

    // Navigate to Add Expense page
    const handleAddExpense = () => {
        navigate('/addexpense'); // Redirect to Add Expense page
    };

    const handleViewExpenses = () => {
        navigate("/viewExpenses");
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white flex justify-center">
            {/* Left side - Main Content */}
            <div className="w-full sm:w-3/4 md:w-1/2 p-8">
                <div className="flex flex-col items-center text-center">
                    {/* Main Content */}
                    <h1 className="text-5xl font-bold text-teal-400">Welcome to RunAI, {user?.name}!</h1>
                    <p className="mt-4 text-xl text-gray-400">AI-Powered Solutions for a Smarter Future</p>
                    <p className="mt-2 text-lg text-gray-300">Your registered email is {user?.email}</p>

                    {/* Button to View Reports */}
                    <div className="mt-8">
                        <a href="/dashboard" className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-lg shadow-md transition">
                            View Previous Reports
                        </a>
                    </div>
                    <div className="mt-8">
                        <button onClick={handleViewExpenses} className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-lg shadow-md transition">
                            View Your Expenses this month
                        </button>
                    </div>

                    {/* Button to Add Expense */}
                    <div className="mt-4">
                        <button
                            onClick={handleAddExpense}
                            className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-lg shadow-md transition"
                        >
                            Add Expense
                        </button>
                    </div>
                </div>
            </div>

            {/* Profile Section (Fixed to the right) */}
            <div className="absolute top-4 right-4 bg-gray-800 p-4 rounded-lg shadow-lg">
                <div className="flex flex-col items-center">
                    <img
                        src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png" // Default profile picture
                        alt="Profile"
                        className="rounded-full mb-2 w-24 h-24 object-cover cursor-pointer" // Add cursor-pointer for better UX
                        onClick={() => setIsProfileVisible(!isProfileVisible)} // Toggle profile section visibility
                    />
                    <h2 className='text-gray-400 font-semibold'>{user.name}</h2>
                    <h2 className='text-green-300'>{user.profession}</h2>
                    {/* Conditionally render profile information */}
                    {isProfileVisible && (
                        <div className="absolute top-16 right-4 bg-gray-800 p-4 rounded-lg shadow-lg w-72">
                            <div className="flex flex-col items-center mb-4">
                                <h2 className="text-lg font-semibold text-teal-400">{user?.name}</h2>
                                <p className="text-gray-400">{user?.email}</p>
                            </div>
                            <div className="flex flex-col space-y-2">
                                {/* Profile Button */}
                                <button
                                    onClick={() => navigate('/profile')}
                                    className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded transition"
                                >
                                    Profile
                                </button>
                                {/* Logout Button */}
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 bg-red-500 hover:bg-red-400 text-white rounded transition"
                                >
                                    Logout
                                </button>
                                {/* About Button */}
                                <a
                                    href="/about"
                                    className="block px-4 py-2 bg-teal-500 hover:bg-teal-400 text-white rounded transition text-center"
                                >
                                    About the Site
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <footer className="fixed bottom-4 w-full text-center text-gray-500 text-sm">
                &copy; 2024, Project 1, TY
            </footer>
        </div>
    );
};

export default HomePage;
