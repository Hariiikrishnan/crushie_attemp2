import React,{useContext} from "react";
import {LoginContext} from "../login/LoginAuth.jsx";
import {RegisterContext} from "../login/RegisterAuth.jsx";

import App from ".//App.jsx"
import Login from "../login/Login.jsx";
import Register from "../login/Register.jsx";

function WholeApp(){
    const [isLoggedIn,setLoggedIn] = useContext(LoginContext);
    const [isRegistered,setRegisterState] = useContext(RegisterContext);

    console.log(isLoggedIn);
    return (
        // <div><h1>Whole App component</h1></div>
        isLoggedIn ?  <App/> : isRegistered ? <Register/>  :  <Login/> 
    )
}

export default WholeApp;

