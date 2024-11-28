import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../Redux/Action';

const SignUp = () => {

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); // Hook to navigate programmatically

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    useEffect(() => {
        // Clear history stack after reaching pageX
        window.history.pushState(null, null, window.location.href); // Push the current state
        window.history.pushState(null, null, window.location.href); // Push again to clear the previous entry
        window.history.forward(); // Move forward to remove the previous entries

        // Optional: Add an event listener for popstate to prevent going back
        const handlePopState = () => {
            navigate('/login'); // Redirect to pageX if user tries to go back
        };

        window.addEventListener('popstate', handlePopState);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [navigate]);

    // Validate form data
    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        return newErrors;
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
    
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            try {
                await dispatch(login({ email: formData.email, password: formData.password }));
                navigate('/homepage');
            } catch (error) {
                setErrors({ form: error.message });
                console.error('Login failed:', error);
            }
        }
    };
    
    

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white">
            <h1 className="text-4xl font-bold text-teal-400 mb-6">Enter credentials to sign in</h1>
            <form onSubmit={handleSignIn} className="bg-gray-800 p-8 rounded-lg shadow-lg">

                <div className="mb-4">
                    <label className="block mb-2" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="px-4 py-2 w-full bg-gray-700 text-white rounded"
                        placeholder="Enter your email"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div className="mb-4">
                    <label className="block mb-2" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="px-4 py-2 w-full bg-gray-700 text-white rounded"
                        placeholder="Enter your password"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>

                <button type="submit" className="w-full bg-teal-500 hover:bg-teal-400 text-white font-semibold py-2 rounded transition">
                    Login
                </button>
            </form>
            <p className="mt-4 text-gray-400">Do not have an account? <a href="/" className="text-teal-400">Create an account</a></p>
        </div>
    );
};

export default SignUp;