import React,{useState,useContext} from "react";
import axios from 'axios';

import {AuthContext} from "./Auth.jsx"
import {LoginContext} from "./LoginAuth.jsx"
import {RegisterContext} from "./RegisterAuth.jsx"
import {UserContext} from "./CurrentUser.jsx"


function Login(){

    const [authState,setAuthState] = useContext(AuthContext);
    const [isLoggedIn,setLoggedIn] = useContext(LoginContext);
    const [isRegistered,setRegisterState] = useContext(RegisterContext);
    const [isCurrentUser,setCurrentUser]=useContext(UserContext);
    const [passwordinvalid,setPasswordInvalid]=useState(false);

    const [startLoading,setLoading]=useState(false);
    const [credentialsError,setCredentialsError]=useState(false);


    const [loginAccount,setLoginAccount]=useState({
        username:"",
        password:"",
    });

    function handleChange(event){
        const {name,value}=event.target;
        setLoginAccount((prevNotes)=>{
            return {...prevNotes,[name]:value};
          });
        
    }
   async function handleLogin(event){
        
        setLoading(true);      
        event.preventDefault();
        if(loginAccount.username === "" || loginAccount.password === ""){
            setCredentialsError(true);
           setInterval(()=>{
            setLoading(false);
           },500) 
        }else{
       
        const config ={
            headers : {
                "Content-Type": "application/json"
            },
        };
        try{
            const body = JSON.stringify(loginAccount);
           await axios.post("https://starfish-app-uva3q.ondigitalocean.app/crushie/users/login",body,config).then((res)=>{
                setLoggedIn(true)    
                setCurrentUser(res.data.user);
                setAuthState(res.data.token);
            })
        }catch (err){
            console.error("error ",err.res.data);
        }  
    }
}

   return <div class="login">
        <form class="create-form">
            <h2 class="below-box">Hii, Had a good Day ?</h2>
            <div class="loginInput">
            <input type="text" name="username" onChange={handleChange} placeholder="Username" autoComplete="off"/>
            <input type="password" name="password" onChange={handleChange} placeholder="Password" autoComplete="off"/>
            </div>
            <div class="below-box">
            {credentialsError ? <p class="below-box passwordError">Please Enter Credentials in all the Fields!</p> : null}
            <button type="submit" onClick={handleLogin} style={{marginBottom:"5%"}}>  { startLoading ? <i class="fa fa-circle-o-notch fa-spin" style={{fontSize:"24px",padding:"5%"}}></i> : "Login" }</button>
            <br></br>
            <a href="/" class="forgotPassword">Forgot Password?</a>

           <div class="registerRedirect">
           <p style={{float:"left"}}>Don't have an Account?</p>
            <a href="/" onClick={(e)=>{
                e.preventDefault();
                setRegisterState(true);
            }} style={{float:"left"}}>Register now!</a>
           </div>
                  
            </div>
        </form>
   </div>
}

export default Login;