import React, { useState,useEffect,useContext } from "react";

import {TimeStampContext} from "../login/TimeStamp.jsx";

function ShortPost(props){
    // console.log(props)
    // var months = [ "January", "February", "March", "April", "May", "June",
    // "July", "August", "September", "October", "November", "December" ];
    // const currentTime=Date.now.toLocaleTimeString
    // const currentDate=Date.getDate
    // const currentMonth=Date.getMonth
    // console.log(currentTime)    .toLocaleString("default", { month: "long" });
    // var timeStamp = props.createdAt;
    const [localtime,setTimeStamp]= useContext(TimeStampContext);

    console.log(localtime + " localtime variable");
    // console.log(props.createdAt);
    // if(timeStamp===undefined){
    //     timeStamp=localtime.toString();
    // }
//    console.log(timeStamp + " timeStamp variable")
//     console.log(timeStamp.slice(0,10))

    // console.log(timeStamp.slice(4,15));
    return <div className="shortPost"  onClick={()=> {
        props.postClick(props.id)
      }}>
      
             <div className="postHead shortpost">
                  <h2>{props.date}</h2>
                  <h2>{props.time}</h2>
                  
             </div>
              <h1 class="post-place">{props.seenplace}</h1>
              <div class="postFoot">
              {/* <p>{months[currentMonth]}</p> */}
              {/* <p>{localtime.toString().slice(4,15)}</p> */}
              {/* <p >{TimeOff && timeStamp}</p> */}
              {/* <p  class="postTime">{localtime.toString().slice(16,24)}</p> */}
             {/* <p class="postTime">{currentTime}</p> */}
             </div>
    </div>
}

export default ShortPost;