import React,{createContext, useContext,useState} from "react";

const initialState = {
    token: ''
}
export const AuthContext = createContext()

function Auth({children}){

    const [authState,setAuthState]=useState(initialState)
    return <AuthContext.Provider value={[authState,setAuthState]}>
    {children}
    </AuthContext.Provider>
}
export default Auth;
//  AuthContext;
