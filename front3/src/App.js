// import logo from './logo.svg';
// import './App.css';

import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './Components/SignUp';
import HomePage from './Components/HomePage';
import SignIn from "./Components/SignIn";
import AddExpense from "./Components/addExpense";
import ViewExpenses from './Components/ViewExpenses';
import ProfilePage from './Components/profile';

function App() {
  return (
    // <Router> - BrowserRouter is used in index.js
            <Routes>
                <Route path='/signin' element={<SignIn />} />
                <Route path="/" element={<SignUp />} />
                <Route path="/homepage" element={<HomePage />}/>
                <Route path="/addexpense" element={<AddExpense />} />
                <Route path="/viewExpenses" element={<ViewExpenses/>} />
                <Route path="/profile" element={<ProfilePage/>}/>
            </Routes>
  );
}

export default App;