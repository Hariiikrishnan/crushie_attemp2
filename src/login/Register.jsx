import React,{useState,useContext} from "react";
import axios from 'axios';

import {LoginContext} from "./LoginAuth.jsx"
import {AuthContext} from "./Auth.jsx"
import {UserContext} from "./CurrentUser.jsx"

function Register(){

    const [passwordValid,setPasswordError]=useState(false);
    const [passwordValue,setPasswordValue]=useState();
    const [confirmValue,setConfirmValue]=useState();
    const [credentialsError,setCredentialsError]=useState(false);
    const [startLoading,setLoading]=useState(false);

    const [isLoggedIn,setLoggedIn] = useContext(LoginContext);
    const [authState,setAuthState] = useContext(AuthContext);
    const [isCurrentUser,setCurrentUser]=useContext(UserContext);
  
    const [userAccount,setRegister]=useState({
        email:"",
        username:"",
        password:"",
        confirmPassword:""
    });

    function handleChange(event){
        const {name,value}=event.target;
        if (name==="password"){
            setPasswordValue(value)
        }else if(name==="confirmPassword"){
            setConfirmValue(value);
        }
        setRegister((prevNotes)=>{
            return {...prevNotes,[name]:value};
          });
    }
    function handleClick(event){
        console.log(userAccount);
        setLoading(true)
        event.preventDefault();
        if(userAccount.email==="" || userAccount.username==="" || userAccount.password ==="" || userAccount.confirmPassword===""){
            setCredentialsError(true);
        }
        else if(passwordValue!==confirmValue && confirmValue!==undefined){
             setPasswordError(true);   
         } else if(passwordValue===confirmValue){
             setPasswordError(false);
             setCredentialsError(false);
             onSubmit();
         }

    }

    async function onSubmit(){
        const config ={
            headers : {
                "Content-Type": "application/json",
            },
        };
        try{
            const body = JSON.stringify(userAccount);
            console.log(body);
            await axios.post("https://starfish-app-uva3q.ondigitalocean.app/crushie/users/register",body,config).then((res)=>{
                console.log(res.data);
                setAuthState(res.data.token);
                setCurrentUser(res.data.user);
                
            })
            setLoggedIn(true);
           
            console.log("Data Sent!!")
        }catch (err){
            console.error("error ",err.res.data)
        }
    }


    return <div class="register">
        <form class="create-form">
            <h2 class="below-box">Hello Annave!!</h2>
            <h2 class="below-box">Create an Account Here.</h2>
            <label>Enter Email Id</label>
            <input type="email" name="email" onChange={handleChange}  placeholder="Email-Id" autoComplete="off" required/>
            <label>Enter Username</label>
            <input type="text" name="username" onChange={handleChange}  placeholder="Username" autoComplete="off" required/>
            <label>Enter Password</label>
            <input type="password" name="password"  onChange={handleChange} placeholder="Password" autoComplete="off" required/>
            <label>Re Enter Password</label>
            <input type="password" name="confirmPassword" onChange={handleChange}  placeholder="Confirm Password" autoComplete="off" required/>
  
            {credentialsError ? <p class="below-box passwordError">Please Enter Credentials in all the Fields!</p> : null}
            {passwordValid ? <p class="below-box passwordError">Password doesn't Match! Please Check Again</p> : null}
            <div class="below-box">
            <button type="submit" onClick={handleClick}>{ startLoading ? <i class="fa fa-circle-o-notch fa-spin" style={{fontSize:"24px",padding:"5%"}}></i> : "Register" }</button>

            </div>
        </form>

    </div>
}

export default Register;