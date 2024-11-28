import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfilePicture, updateProfession, updateAboutYourself, updateCompany } from '../Redux/Action';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.currUser);

    // State for handling inputs
    const [about, setAbout] = useState(user?.setAbout || "");
    const [profilePictureUrl, setProfilePictureUrl] = useState(user?.profilePictureUrl || "");
    const [profession, setProfession] = useState(user?.profession || "");
    const [company, setCompany] = useState(user?.company || "");

    // Handle changes in the "About Yourself" text box
    const handleAboutChange = (e) => {
        setAbout(e.target.value);
    };

    const handleCompanyChange = (e) => {
        setCompany(e.target.value);
    };

    // Handle profession change
    const handleProfessionChange = (e) => {
        setProfession(e.target.value);
    };

    // Handle profile picture URL change
    const handleProfilePicUrlChange = () => {
        dispatch(updateProfilePicture(profilePictureUrl)); // Dispatch Redux action
        alert("Profile picture updated successfully!");
    };

    // Handle profession update
    const handleProfessionUpdate = () => {
        dispatch(updateProfession(user.email, profession)); // Dispatch Redux action
        alert("Profession updated successfully!");
    };

    const handleCompanyUpdate = () => {
        dispatch(updateCompany(user.email, company)); // Dispatch Redux action
        alert("Work place updated successfully!");
    };

    // Handle About Yourself update
    const handleAboutUpdate = () => {
        dispatch(updateAboutYourself(user.email, about)); // Dispatch Redux action
        alert("About Yourself updated successfully!");
    };

    // Handle logout
    const handleLogout = () => {
        navigate('/'); // Redirect to the homepage or login page
    };

    const handleBack =() => {
        navigate(-1);
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center">
            {/* Profile Header */}
            <div className="w-full bg-teal-500 py-12 shadow-lg">
                <h1 className="text-5xl font-semibold text-white text-center">Your Profile</h1>
                <p className="mt-2 text-xl text-center text-gray-200">Manage and update your profile details</p>
            </div>

            {/* Profile Section */}
            <div className="max-w-4xl w-full p-8 mt-8 bg-gray-800 rounded-lg shadow-xl space-y-8">
                {/* Profile Picture and Name */}
                <div className="flex flex-col items-center space-y-4">
                    <img
                        src={profilePictureUrl || "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"} // Display the updated URL or a default placeholder
                        alt="Profile"
                        className="rounded-full w-32 h-32 object-cover mb-4 shadow-md border-4 border-teal-500"
                    />
                    <input
                        type="text"
                        value={profilePictureUrl}
                        onChange={(e) => setProfilePictureUrl(e.target.value)}
                        placeholder="Enter new profile picture URL"
                        className="mt-2 p-2 rounded-lg bg-gray-700 text-teal-500"
                    />
                    <button
                        onClick={handleProfilePicUrlChange}
                        className="mt-4 px-6 py-3 bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-lg shadow-md transition"
                    >
                        Update Profile Picture
                    </button>
                </div>

                {/* User Information */}
                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-lg text-teal-400">Name:</span>
                        <span className="text-lg text-gray-300">{user?.name}</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-lg text-teal-400">Work place:</span>
                        <div className="flex items-center space-x-4">
                            <input
                                type="text"
                                value={company}
                                onChange={handleCompanyChange}
                                className="text-lg text-gray-300 bg-gray-700 p-2 rounded-lg flex-1"
                            />
                            <button
                                onClick={handleCompanyUpdate}
                                className="px-6 py-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-lg shadow-md mt-2"
                            >
                                Update Work Place
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-lg text-teal-400">Profession:</span>
                        <div className="flex items-center space-x-4">
                            <input
                                type="text"
                                value={profession}
                                onChange={handleProfessionChange}
                                className="text-lg text-gray-300 bg-gray-700 p-2 rounded-lg flex-1"
                            />
                            <button
                                onClick={handleProfessionUpdate}
                                className="px-6 py-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-lg shadow-md mt-2"
                            >
                                Update Profession
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-lg text-teal-400">Current Salary (Yearly):</span>
                        <span className="text-lg text-gray-300">{user?.salary || 'Not Provided'}</span>
                    </div>
                </div>

                {/* About Yourself Section */}
                <div className="space-y-2">
                    <label className="font-semibold text-lg text-teal-400" htmlFor="about">About Yourself:</label>
                    <textarea
                        id="about"
                        value={about}
                        onChange={handleAboutChange}
                        rows="6"
                        className="w-full mt-2 p-4 bg-gray-700 text-gray-300 rounded-lg resize-none"
                        placeholder="Tell us something about yourself..."
                    />
                    <button
                        onClick={handleAboutUpdate}
                        className="px-6 py-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-lg shadow-md mt-2"
                    >
                        Update about yourself
                    </button>
                </div>

                {/* Buttons */}
                <div className="mt-8 w-full flex justify-center space-x-4">
                    <button className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-white font-semibold rounded-lg shadow-md transition transform hover:scale-105" onClick={handleBack}>
                        Go Back
                    </button>
                    <button
                        onClick={handleLogout}
                        className="px-6 py-3 bg-red-500 hover:bg-red-400 text-white font-semibold rounded-lg shadow-md transition transform hover:scale-105"
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Footer */}
            <footer className="fixed bottom-4 w-full text-center text-gray-500 text-sm">
                &copy; 2024, Project 1, TY
            </footer>
        </div>
    );
};

export default ProfilePage;
