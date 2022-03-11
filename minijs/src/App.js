import './App.css';
import React,{ useState } from 'react';
import axios from 'axios';
import LoginPage from './Components/login/LoginPage';
import SignUp from './Components/SignUp/SignUp';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const App = () => {
  return(
<BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />}  />
      <Route exact path="/login" element={<LoginPage />} />
      <Route exact path="/signup" element={<SignUp />} />
    </Routes>
  </BrowserRouter>
  )
  }
export default App;
