import React, {useState,useEffect,useContext}  from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import CreateArea from ".//CreateArea.jsx";
import Post from ".//Post.jsx"
import HomeBtn from ".//HomeBtn.jsx"
import ShortPost from ".//ShortPost.jsx"
import Header from ".//Header.jsx"

import Zoom from '@mui/material/Zoom';
// import { Update } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { BrowserRouter } from "react-router-dom";

import axios from 'axios';
import Slide from '@mui/material/Slide';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';

import {AuthContext} from "../login/Auth.jsx";
import {UserContext} from "../login/CurrentUser.jsx";
import {RegisterContext} from "../login/RegisterAuth.jsx";


function App(){

    var u_id=-1;
    var unspreadedEditPost ={};
    var editedPost;
    var balPost={};
 
    // const navigate = useNavigate();
    const [posts,setPosts]=useState([]);
    // const [bigPost,setBigPost]=useState();

    const [isExpanded,setExpand]=useState(false);
    const [isPostExpanded,setPostExpand]=useState(false);
    const [clickedID,setClickedId]=useState(0);
    const [isEdit,setEdit]=useState(false);
    const [transition, setTransition] = useState(undefined);
    const [startLoading,setLoading]=useState(true);
    const [openSnack,setSnack]=useState(false);
    const [snackType,setSnackType]=useState("");

    const [authState,setAuthState] = useContext(AuthContext);
    const [isCurrentUser,setCurrentUser] = useContext(UserContext);
  // const [removeHomeBtn,setRemoveBTn]=useState(false);
    const [isRegistered,setRegisterState] = useContext(RegisterContext);
    // console.log(authState + " from App Component")
    // console.log(isCurrentUser);
    function onAdd(newPost){
        // console.log("Req for Adding");
      
        //   console.log(newPost);
     
        setPosts((prevPosts)=>{
            return  [...prevPosts,newPost]
        }) 

        // isEdit ? [...balPost,editedPost[0]] :
        setExpand(false);
        setEdit(false);
        setPostExpand(false); 
        setSnack(true);
        setSnackType("Added")
        setInterval(()=>{
            setSnack(false);
        },2000)       
    }
   
    function handleUpdateReturn(newPost){

             
            // console.log(newPost);
            // console.log(clickedID);
            unspreadedEditPost = posts.filter((singlePost,index)=>{
                // console.log(singlePost._id);
            return singlePost._id===clickedID
          })
          balPost = posts.filter((singlePost,index)=>{
            return singlePost._id!==clickedID;
          })
           console.log(unspreadedEditPost);
            editedPost =  Object.assign({},unspreadedEditPost);
            // console.log(unspreadedEditPost);
            // console.log(editedPost);

             Object.keys(editedPost[0]).forEach(key=>{
                 if(key in newPost){
                   editedPost[0][key]=newPost[key]
                 }
               })
               console.log(editedPost);
            //    console.log(...editedPost);
            //    console.log([...balPost,editedPost[0]])

           
        setExpand(false);
        setEdit(false);
        setPostExpand(false);
        setSnack(true);
        setSnackType("Updated!")
        setInterval(()=>{
            setSnack(false);
        },2000) 
    }

    async function getAllPosts(){
       
        const config ={
            headers : {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + authState
            },
        };
        try{
            const res= await axios.get("http://localhost:3001/post",config);
            console.log(res.data.results);
            
            setPosts(res.data.results);
            setLoading(false);
        }catch (err){
            console.error("error",err)
        }
    };
    useEffect(()=>{
        getAllPosts();
    },[])
   

   function HomeBtnExpand(){
       setExpand(true); 
   }
   function backBtn(){
    setExpand(false);
    setEdit(false);
   }
   async function deletePost(id){
    const config ={
        headers : {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + authState
        },
    };
    // console.log(id);
    await axios.delete(`http://localhost:3001/post/${id}`,config).then((res)=>{
        setPosts((prevPosts)=>{
            return prevPosts.filter((value,index)=>{
                return value._id!==id;
            })
        });
        setPostExpand(false);
    }
    );
    setSnack(true);
    setSnackType("Deleted!")
    setInterval(()=>{
        setSnack(false);
    },2000) 
   };

  
   function editPost(id){
    setEdit(true); 
    setPostExpand(false);
    
   }
   console.log(isEdit);
 
   function postExpand(id){
        console.log(id);
        // clickedPost=id;
        setClickedId(id);
      
        // console.log("post clicked " + clickedID)
        setPostExpand(true);
      
        
   }
//    console.log(isCurrentUser[0].username);
          
    return <div>
        {/* <BrowserRouter> 
         <Routes> */}

         <div class="HeadandLoad">
         {/* <Route exact path="/" element={<Header />} /> */}
         <Header /> 
         { startLoading ? <CircularProgress className="loader" color="inherit" /> : null }
         {/* <h2 class="below-box headUsername">Hello {isRegistered ? null : isCurrentUser[0].username}</h2> */}
         </div>
         {/* <Route path="/" element= /> */}
         { 
             isExpanded  || isPostExpanded || isEdit? null  :
              <HomeBtn HomeOnClick={HomeBtnExpand}/> 
              } 

              <Snackbar
                    open={openSnack}
                    
                  ><SnackbarContent style={{
                    backgroundColor:'white',
                    color:'black',
                   
                    display:"center",
                    alignItems:"center",
                    justifyContent:"center",
                    borderRadius:'10px',
                    margin:"0% 26%",
                    marginBottom:'15%'
                  }}
    message={<span id="client-snackbar">Moment {snackType}</span>}
  /></Snackbar>

 
           { isExpanded  ?  <CreateArea 
          onAdd={onAdd} 
        //   onSubmit={onSubmit}
          handleBackBtn={backBtn}
          /> : null}
     
      {  isExpanded || isPostExpanded || isEdit?  null : posts.length > 0 ? posts.map((singlePost,index)=>{
        u_id++;
        
        return <ShortPost  
            key={singlePost._id}
            id={singlePost._id}
            date={singlePost.date}
            time={singlePost.time}
            seenplace={singlePost.place}
            createdAt={singlePost.createdAt}
            updatedAt={singlePost.updatedAt}

            postClick={postExpand}
            
            />
      }) : null }

      
          
       
   
        { isPostExpanded ?  posts.map((singlePost,index) => {
          
            if(clickedID===singlePost._id){
                console.log(clickedID + "And " + index);
             
                return   <Post 
                    key={singlePost._id}
                    id={singlePost._id}
                    date={singlePost.date}
                    time={singlePost.time}
                    seenplace={singlePost.place}
                    dresscolor={singlePost.color}
                    shesaw={singlePost.saw}
                    reaction={singlePost.response}

                    OnDelete={deletePost}
                    onEdit={editPost}
                    handleBackBtn={()=>{
                        setPostExpand(false);
                     }}
        /> 
               
            } 
        })  : null }          
            

        {
            isEdit ? isPostExpanded ? null:      
            posts.map((singlePost,index) => {
          
          if(clickedID===singlePost._id){
              {/* console.log(clickedID + "And " + index); */}
             return <CreateArea 
              onUpdate={handleUpdateReturn}  

             
              handleBackBtn={backBtn}
              key={singlePost._id}
              id={singlePost._id}
             date={singlePost.date}
            time={singlePost.time}
            seenplace={singlePost.place}
            dresscolor={singlePost.color}
            shesaw={singlePost.saw}
            reaction={singlePost.response}
            isEdit={isEdit}
      />
       }
              })  : null  } 
        

         
    
    </div>
}
export default App;