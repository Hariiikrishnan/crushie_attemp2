import React from "react";
// import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';

function HomeBtn(props){
    return <div className="HomeBtn">
    <div class="childBtn">
          <Fab className="HomeFab" onClick={()=>{
            props.HomeOnClick()
            
          }}><span class="material-symbols-outlined">heart_plus</span></Fab>
    </div></div>
}

export default HomeBtn;