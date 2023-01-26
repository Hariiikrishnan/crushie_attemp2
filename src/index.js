import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";


import WholeApp from "./components/WholeApp";

import Auth from "./login/Auth.jsx";
import LoginAuth from "./login/LoginAuth.jsx";
import RegisterAuth from "./login/RegisterAuth.jsx";
import CurrentUser from "./login/CurrentUser.jsx";
import TimeStamp from "./login/TimeStamp.jsx";


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(

  <StrictMode>
    
   
    <RegisterAuth>
    <LoginAuth>
    <CurrentUser>
    <TimeStamp>
      <Auth>
    
      <WholeApp />
      
      </Auth>
      </TimeStamp>
    </CurrentUser>
    </LoginAuth>
      </RegisterAuth>
   
  </StrictMode>
  
);
