import React from 'react';
import SignUp from './Components/signUp/signUp';
import LoginPage from './Components/LoginScreen/login';
import WelcomeScreen from "./Components/welcomeScreen/WelcomeScreen";
import VerifyUser from "./Components/verifyUser/VerifyUser";
import { BrowserRouter, Routes, Route, Navigate, } from "react-router-dom";
import ContextProvider from "./dataProvider";
const App = () => {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route exact path="/create" element={<SignUp />} />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/welcome" element={<WelcomeScreen />} />
          <Route exact path="/user/:id/verify/:token" element={<VerifyUser />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  )
}
export default App;
