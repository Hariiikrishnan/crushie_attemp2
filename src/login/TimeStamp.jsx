import React,{createContext, useContext,useState} from "react";


export const TimeStampContext = createContext()

function TimeStamp({children}){

    const [localtime,setTimeStamp] = useState("")

    return <TimeStampContext.Provider value={ [localtime,setTimeStamp]}>
    {children}
    </TimeStampContext.Provider>
}
export default TimeStamp;
