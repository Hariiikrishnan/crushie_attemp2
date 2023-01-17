import React,{createContext, useContext,useState} from "react";


export const RegisterContext = createContext()

function RegisterAuth({children}){

    const [isRegistered,setRegisterState] = useState(false)

    return <RegisterContext.Provider value={[isRegistered,setRegisterState]}>
    {children}
    </RegisterContext.Provider>
}
export default RegisterAuth;
