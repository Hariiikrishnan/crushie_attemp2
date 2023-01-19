import React,{useState,useContext} from "react";
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import LoupeIcon from '@mui/icons-material/Loupe';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import Fab from '@mui/material/Fab';
import CircularProgress from '@mui/material/CircularProgress';

import axios from 'axios';

import {AuthContext} from "../login/Auth.jsx";

function CreateArea(props){
    const [post,setPost]=useState({
        date:"",
        time:"",
        place:"",
        color:"",
        saw:"",
        response:""
    });
    const [editPost,setEditPost]=useState();
    const [isLoading,setLoading]=useState(false);

    const [authState, ] = useContext(AuthContext);

 console.log(props);

  function handleForm(event){
    console.log("Handling Form")
      event.preventDefault();
      setLoading(true);
      props.isEdit ?  handleUpdate(props.id) : onSubmit(event); 
      
      
 
  }
  async function onSubmit(e){
    // e.preventDefault();
    console.log("called");
   
        const config ={
            headers : {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + authState
            },
        };
            try{
                const body = JSON.stringify(post);
                await axios.post("http://localhost:3001/post",body,config);
                setPost({
                   date:"",
                   time:"",
                   place:"",
                   color:"",
                   saw:"",
                   response:""
                 });
                //  window.location.reload();
                setLoading(false);
            }catch (err){
                console.error("error ",err.res.data)
            }
            props.onAdd(post);
  }
  async function handleUpdate(id){
    // const id = .id;
    console.log(id + " from client side edit route!");
    const config ={
      headers : {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + authState
      },
  };
      try{
        const body = JSON.stringify(editPost);
        await axios.post(`http://localhost:3001/edit/${id}`,body,config);
        // window.location.reload();
        // setPost({
        //   date:"",
        //   time:"",
        //   place:"",
        //   color:"",
        //   saw:"",
        //   response:""
        // });
        // console.log(editPost);
       
        } catch (err){
          console.error("error ",err.res.data)
        }
        props.onUpdate(editPost);
   }

  function handleChange(event){
       const {value,name}= event.target;
        // setPost(value);
        setPost((prevNotes)=>{
            // console.log(prevNotes);
            return {...prevNotes,[name]:value};
          })
          
        // console.log("changed");
      //  console.log(post);
      //  console.log(name);
      
  }
  function handleEdit(event){
    const {value,name}= event.target;
   
    //  console.log(event.target.value);
     console.log("chnaging for updatinonS")
    
     setEditPost((prevNotes)=>{
    
      // console.log(prevNotes);
      return {...prevNotes,[name]:value};
    })
    // handleUpdate(editPost._id);
    // console.log(editPost);
    //  setEditPost(event.target.value);
    //  console.log("Changinng for Editing")
  }

    return  <div className="createArea">
 
    
        <form class="create-form" validate="true">

        <div className="backButton createArea" >
              <Fab onClick={()=>{
                props.handleBackBtn()
              }} > 
              <span class="material-symbols-outlined">close</span>
              {/* <ArrowBackIcon /> */}
              </Fab></div>
            <label>Date and Time:</label>

            <input onChange={props.isEdit ?handleEdit: handleChange} type="date" name="date" defaultValue={props.isEdit ? props.date : null } required={true} autoComplete="off"/>
            <input onChange={props.isEdit ?handleEdit: handleChange} type="time" name="time" defaultValue={props.isEdit ? props.time : null } required={true} autoComplete="off"/>
            <label>Where did you Saw her?</label>
            <input onChange={props.isEdit ?handleEdit: handleChange} name="place" placeholder="Place" defaultValue={props.isEdit ? props.seenplace : null } required={true} autoComplete="off"/>
            <label>Dress Color:</label>
            <input onChange={props.isEdit ?handleEdit: handleChange} name="color" placeholder="Color" defaultValue={props.isEdit ? props.dresscolor : null } required={true} autoComplete="off"/>
            <label>Did She Saw You?</label>
            <input onChange={props.isEdit ?handleEdit: handleChange} name="saw" placeholder="Did she?" defaultValue={props.isEdit ? props.shesaw : null } required autoComplete="off"/>
            <label>How did i React?</label>
            <input onChange={props.isEdit ?handleEdit: handleChange} name="response" placeholder="How?" defaultValue={props.isEdit ? props.reaction : null } required autoComplete="off"/>
            <div className="saveBtn">
              <Fab onClick={handleForm} type="submit">
              <SaveAltIcon/>
              {/* <span class="material-symbols-outlined">check</span> */}
              { isLoading && <CircularProgress
            size={68}
            sx={{
              position: 'absolute',
              top: -6,
              left: -6,
              zIndex: 1,
            }} 
          /> }
          </Fab> 
              
            </div>
            
        </form>
        
    </div>
    
}

export default CreateArea;