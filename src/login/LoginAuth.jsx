import React,{createContext, useContext,useState} from "react";


export const LoginContext = createContext()

function LoginAuth({children}){

    const [isLoggedIn,setLoggedIn]=useState(false)

    return <LoginContext.Provider value={[isLoggedIn,setLoggedIn]}>
    {children}
    </LoginContext.Provider>
}
export default LoginAuth;

