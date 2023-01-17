import React,{useState,useContext} from "react";
import axios from 'axios';


// import { Button } from "@mui/material";
// import { Button } from "rsuite";
// // Default CSS
// import "rsuite/dist/rsuite.min.css";

import {LoginContext} from "./LoginAuth.jsx"

import {AuthContext} from "./Auth.jsx"

function Register(){

    // var passwordValue;
    // var confirmValue;

    const [passwordValid,setPasswordError]=useState(false);
    const [passwordValue,setPasswordValue]=useState();
    const [confirmValue,setConfirmValue]=useState();
    const [credentialsError,setCredentialsError]=useState(false);
    const [startLoading,setLoading]=useState(false);


    const [isLoggedIn,setLoggedIn] = useContext(LoginContext);
    const [authState,setAuthState] = useContext(AuthContext);
    // const [users,setUsers]=useState([]);
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
        // console.log(name + " " + value); 
        setRegister((prevNotes)=>{
            // console.log(prevNotes);
            return {...prevNotes,[name]:value};
          });
    }
    function handleClick(event){
        setLoading(true)
        event.preventDefault();
        if(userAccount.email==="" || userAccount.username==="" || userAccount.password ==="" || userAccount.confirmPassword===""){
            setCredentialsError(true);
        }
        // console.log(passwordValue + "  " + confirmValue);
        else if(passwordValue!==confirmValue && confirmValue!==undefined){
             setPasswordError(true);   
         } else if(passwordValue===confirmValue){
             setPasswordError(false);
             setCredentialsError(false);
             onSubmit();
         }

        //  console.log("onClick Called")
        
    }

    async function onSubmit(){
        const config ={
            headers : {
                "Content-Type": "application/json",
            },
        };
        try{
            const body = JSON.stringify(userAccount);
            await axios.post("/register",body,config).then((res)=>{
                console.log(res.data);
                setAuthState(res.data.token);
            })
            setLoggedIn(true);
            //  window.location.reload();
            console.log("Data Sent!!")
        }catch (err){
            console.error("error ",err.res.data)
        }
    }
// console.log(passwordValue + "  " + confirmValue);
    // console.log(userAccount);


    // function passwordValidation(event){
    //     const {name,value}=event.target;
    //     // console.log(name + " " + value);
    //     if (name==="password"){
    //         setPasswordValue(value)
    //         // console.log(passwordValue);
    //     }else{
    //         setConfirmValue(value);
    //     }
    //     setPasswordValidation();  
    // }
    // function setPasswordValidation(){
    //     console.log(passwordValue + "  " + confirmValue)
    //     if(passwordValue!==confirmValue && confirmValue!==undefined){
    //         setPasswordError(true);
            
    //     } else{
    //         setPasswordError(false);
    //     }
    // }
    


    return <div class="register">
        <form class="create-form">
            <h2 class="below-box">Hello Annave!!</h2>
            <h2 class="below-box">Create an Account Here.</h2>
            <label>Enter Email Id</label>
            <input type="email " name="email" onChange={handleChange}  placeholder="Email-Id" autoComplete="off" required/>
            <label>Enter Username</label>
            <input type="text" name="username" onChange={handleChange}  placeholder="Username" autoComplete="off" required/>
            <label>Enter Password</label>
            <input type="password " name="password"  onChange={handleChange} placeholder="Password" autoComplete="off" required/>
            <label>Re Enter Password</label>
            <input type="password " name="confirmPassword" onChange={handleChange}  placeholder="Confirm Password" autoComplete="off" required/>
  
            {credentialsError ? <p class="below-box passwordError">Please Enter Credentials in all the Fields!</p> : null}
            {passwordValid ? <p class="below-box passwordError">Password doesn't Match! Please Check Again</p> : null}
            <div class="below-box">
            <button type="submit" onClick={handleClick}>{ startLoading ? <i class="fa fa-circle-o-notch fa-spin" style={{fontSize:"24px",padding:"5%"}}></i> : "Register" }</button>

            {/* <p>Already have an Account?</p>
            <a href="/" onClick={(e)=>{
                e.preventDefault();
                setRegisterState(true);
            }}>Login now!</a> */}
            </div>
        </form>

    </div>
}

export default Register;