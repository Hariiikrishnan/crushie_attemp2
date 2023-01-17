import React,{useContext} from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import WholeApp from "./components/WholeApp";
import Login from "./login/Login.jsx";
import Register from "./login/Register.jsx";
import Auth from "./login/Auth.jsx";
import LoginAuth from "./login/LoginAuth.jsx";
import RegisterAuth from "./login/RegisterAuth.jsx";
import CurrentUser from "./login/CurrentUser.jsx";
// import {LoginAuth} from "./login/LoginAuth.jsx";

import { useNavigate } from "react-router";
import { Navigate, Route, Routes } from "react-router-dom";



const rootElement = document.getElementById("root");
const root = createRoot(rootElement);



root.render(

  <StrictMode>
    {/* <BrowserRouter>
    <Routes>
    <Route exact path="/" element={
      
    } /> */}
   
    <RegisterAuth>
    <LoginAuth>
    <CurrentUser>
      <Auth>
       {/* <Login />   */}
      <WholeApp />
      {/* <Register /> */}
      </Auth>
    </CurrentUser>
    </LoginAuth>
      </RegisterAuth>
    {/* </Routes>
    </BrowserRouter> */}
  </StrictMode>
  
);
