import React,{createContext, useContext,useState} from "react";

const initialState = {
    users: []
}
export const UserContext = createContext()

function CurrentUser({children}){

    const [isCurrentUser,setCurrentUser] = useState(initialState)

    return <UserContext.Provider value={[isCurrentUser,setCurrentUser]}>
    {children}
    </UserContext.Provider>
}
export default CurrentUser;

