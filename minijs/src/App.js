import './App.css';
import React,{ useState } from 'react';
import axios from 'axios';
import SignUp from './Components/signUp/signUp';
import LoginPage from './Components/LoginScreen/login';
import WelcomeScreen from "./Components/welcomeScreen/WelcomeScreen";
import VerifyUser from "./Components/verifyUser/VerifyUser";
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
      <Route exact path ="/welcome" element={<WelcomeScreen />} />
      <Route exact path="/user/:id/verify/:token" element={<VerifyUser />}/>
    </Routes>
  </BrowserRouter>
  )
  }
export default App;
