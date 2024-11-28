import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../Redux/Action';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    useEffect(() => {
        // Clear history stack after reaching pageX
        window.history.pushState(null, null, window.location.href); // Push the current state
        window.history.pushState(null, null, window.location.href); // Push again to clear the previous entry
        window.history.forward(); // Move forward to remove the previous entries

        // Optional: Add an event listener for popstate to prevent going back
        const handlePopState = () => {
            navigate('/'); // Redirect to pageX if user tries to go back
        };

        window.addEventListener('popstate', handlePopState);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Attempt to register the user
            await dispatch(register(formData)); //awaiting is important
            navigate('/homepage');
        } catch (error) {
            // Handle the error accordingly, e.g., show a message to the user
            console.error('Registration failed:', error);
            alert('Registration failed: ' + error.message);
        }
    };

    const handleSignIn = () => {
        navigate('/signin');
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-teal-500 p-4 relative">
            {/* RunAI Logo in the Corner */}
            <div className="absolute top-4 left-4 text-white">
                <h1 className="text-5xl font-bold">RunAI</h1>
                <p className="text-lg">Financial Solutions</p>
            </div>

            {/* Sign Up Form */}
            <form onSubmit={handleSubmit} className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Create Your Account</h2>
                
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                />
                
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                />
                
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                />
                
                <button type="submit" className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition duration-200">
                    Sign Up
                </button>
            </form>

            {/* Sign In Navigation Button */}
            <div className="mt-4">
                <p className="text-gray-700">
                    Already have an account? 
                    <button 
                        onClick={handleSignIn} 
                        className="text-teal-500 font-semibold ml-1 hover:underline">
                        Sign In
                    </button>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
