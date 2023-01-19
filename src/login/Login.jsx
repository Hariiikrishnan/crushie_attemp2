import React,{useState,useContext} from "react";
import axios from 'axios';
// import { LoginSharp } from "@mui/icons-material";
import Cookies from 'universal-cookie';
// import { Button } from "rsuite";
// // Default CSS
// import "rsuite/dist/rsuite.min.css";

import {AuthContext} from "./Auth.jsx"
import {LoginContext} from "./LoginAuth.jsx"
import {RegisterContext} from "./RegisterAuth.jsx"
import {UserContext} from "./CurrentUser.jsx"

// const cookies = new Cookies();

function Login(){

    const [authState,setAuthState] = useContext(AuthContext);
    const [isLoggedIn,setLoggedIn] = useContext(LoginContext);
    const [isRegistered,setRegisterState] = useContext(RegisterContext);
    const [isCurrentUser,setCurrentUser]=useContext(UserContext);
    // const [users,setUsers] = useState([]);


    const [startLoading,setLoading]=useState(false);
    const [credentialsError,setCredentialsError]=useState(false);


    const [loginAccount,setLoginAccount]=useState({
        username:"",
        password:"",
    });

    function handleChange(event){
        const {name,value}=event.target;
        // console.log(event.target);
        
        // console.log(loginAccount)
        setLoginAccount((prevNotes)=>{
            // console.log(prevNotes);
            return {...prevNotes,[name]:value};
          });
        
    }
   async function handleLogin(event){
        
        // let user = JSON.parse(sessionStorage.getItem('data'));
        // const token = req.header('Authorization').replace('Bearer ', '')
        // const token = user.data.id;
        // console.log(token);
        // console.log(user)
        setLoading(true);      
        event.preventDefault();
        if(loginAccount.username === "" || loginAccount.password === ""){
            setCredentialsError(true);
           setInterval(()=>{
            setLoading(false);
           },500) 
        }else{
       
        // console.log(loginAccount)
        const config ={
            headers : {
                // "Authorization" : `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        };
        try{
            const body = JSON.stringify(loginAccount);
           await axios.post("http://localhost:3001/login",body,config).then((res)=>{
          
    // setCurrentUser(finalUser);
    //         setCurrentUser(res.data.users.filter((singleUser)=>{
    //             return singleUser.username === loginAccount.username
            
    // }))
                setLoggedIn(true)
            //    console.log(res.data);
                // console.log(res.data.users);

                // setCurrentUser(res.data.users);
                setCurrentUser(res.data.users.filter((singleUser)=>{
                 return singleUser.username === loginAccount.username
                         }));
                setAuthState(res.data.token);
                // console.log(authState);
                // console.log(isCurrentUser);
                // console.log(res.data.token);
                
                // console.log(users);
//         console.log(res.data.users.filter((singleUser)=>{
//             return singleUser.username === loginAccount.username
        
// }))
                // console.log(res.data.users);
            })
            
            //  window.location.reload();
            // console.log(JSON)
            console.log("Login Data Sent!!")
        }catch (err){
            console.error("error ",err.res.data)
            // console.log("error")
        }
        // setLoading(false);   
    }
}
    
// console.log(authState);
// console.log(isCurrentUser);
  

    //  console.log("Outside Token " + authState)
   return <div class="login">
        <form class="create-form">
            <h2 class="below-box">Hii, Had a good Day ?</h2>
            <div class="loginInput">
            {/* <label>Enter Username</label> */}
            <input type="text" name="username" onChange={handleChange} placeholder="Username" autoComplete="off"/>
            {/* <label>Enter Password</label> */}
            <input type="password " name="password" onChange={handleChange} placeholder="Password" autoComplete="off"/>
            </div>
            <div class="below-box">
            {credentialsError ? <p class="below-box passwordError">Please Enter Credentials in all the Fields!</p> : null}
            <button type="submit" onClick={handleLogin} style={{marginBottom:"5%"}}>  { startLoading ? <i class="fa fa-circle-o-notch fa-spin" style={{fontSize:"24px",padding:"5%"}}></i> : "Login" }</button>
            <br></br>
            {/* <p>Already have an Account?</p> */}
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