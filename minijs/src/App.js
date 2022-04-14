import './App.css';
import React,{ useState } from 'react';
import axios from 'axios';
import SignUp from './Components/signUp/signUp';
import LoginPage from './Components/LoginScreen/login';
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
      <Route exact path="/create" element={<SignUp />} />
      <Route exact path="/login" element={<LoginPage />} />
    </Routes>
  </BrowserRouter>
  )
  }
export default App;
