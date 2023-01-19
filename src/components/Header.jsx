import React,{useContext} from "react";
import Fab from '@mui/material/Fab';
// import LogoutIcon from '@mui/icons-material/Logout';


import {LoginContext} from "../login/LoginAuth.jsx"
import {RegisterContext} from "../login/RegisterAuth.jsx";



function Header(){

     
    const [isLoggedIn,setLoggedIn] = useContext(LoginContext);
    const [isRegistered,setRegisterState] = useContext(RegisterContext);

    return  <div id="HeadContainer">
    <div id="Heading">
    <hr></hr>
    <h1>Crushie Moments</h1>
    </div>
    <Fab onClick={()=>{
                setLoggedIn(false);
                setRegisterState(false);
              }} 
              style={{background:"none",color:"white",boxShadow:"none",alignItems: "flex-start",justifyContent:"left"}} >
              <span class="material-symbols-outlined">logout</span>
              {/* <LogoutIcon/> */}
              </Fab>
    </div> 
    
    
  
}

export default Header;