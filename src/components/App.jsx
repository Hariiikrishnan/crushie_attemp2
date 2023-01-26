import React, { useState, useEffect, useContext } from "react";

import CreateArea from ".//CreateArea.jsx";
import Post from ".//Post.jsx";
import HomeBtn from ".//HomeBtn.jsx";
import ShortPost from ".//ShortPost.jsx";
import Header from ".//Header.jsx";

import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";

import { AuthContext } from "../login/Auth.jsx";
import { UserContext } from "../login/CurrentUser.jsx";
import { RegisterContext } from "../login/RegisterAuth.jsx";

function App() {
  var us_id = -1;
  var unspreadedEditPost = {};
  var editedPost;
  var balPost = {};

  const [posts, setPosts] = useState([]);

  const [isExpanded, setExpand] = useState(false);
  const [isPostExpanded, setPostExpand] = useState(false);
  const [clickedID, setClickedId] = useState(0);
  const [isEdit, setEdit] = useState(false);
  const [transition, setTransition] = useState(undefined);
  const [startLoading, setLoading] = useState(true);
  const [openSnack, setSnack] = useState(false);
  const [snackType, setSnackType] = useState("");

  const [authState, setAuthState] = useContext(AuthContext);
  const [isCurrentUser, setCurrentUser] = useContext(UserContext);
  const [isRegistered, setRegisterState] = useContext(RegisterContext);

  function onAdd(newPost) {
    setPosts((prevPosts) => {
      return [...prevPosts, newPost];
    });
    setExpand(false);
    setEdit(false);
    setPostExpand(false);
    setSnack(true);
    setSnackType("Added");
    setInterval(() => {
      setSnack(false);
    }, 2000);
  }

  function handleUpdateReturn(newPost) {
    unspreadedEditPost = posts.filter((singlePost, index) => {
      return singlePost._id === clickedID;
    });
    balPost = posts.filter((singlePost, index) => {
      return singlePost._id !== clickedID;
    });
    console.log(unspreadedEditPost);
    editedPost = Object.assign({}, unspreadedEditPost);

    Object.keys(editedPost[0]).forEach((key) => {
      if (key in newPost) {
        editedPost[0][key] = newPost[key];
      }
    });
    console.log(editedPost);

    setExpand(false);
    setEdit(false);
    setPostExpand(false);
    setSnack(true);
    setSnackType("Updated!");
    setInterval(() => {
      setSnack(false);
    }, 2000);
  }

  async function getAllPosts() {
    console.log("called");
    console.log(isCurrentUser);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authState,
      },
    };
    try {
      const res = await axios.get(
        `https://starfish-app-uva3q.ondigitalocean.app/post/${isCurrentUser.u_id}`,
        config
      );

      setPosts(res.data.results);
      setLoading(false);
    } catch (err) {
      console.error("error", err);
    }
  }
  useEffect(() => {
    getAllPosts();
  }, []);

  function HomeBtnExpand() {
    setExpand(true);
  }
  function backBtn() {
    setExpand(false);
    setEdit(false);
  }
  async function deletePost(id) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authState,
      },
    };
    await axios
      .delete(
        `https://starfish-app-uva3q.ondigitalocean.app/post/${id}`,
        config
      )
      .then((res) => {
        setPosts((prevPosts) => {
          return prevPosts.filter((value, index) => {
            return value._id !== id;
          });
        });
        setPostExpand(false);
      });
    setSnack(true);
    setSnackType("Deleted!");
    setInterval(() => {
      setSnack(false);
    }, 2000);
  }

  function editPost(id) {
    setEdit(true);
    setPostExpand(false);
  }

  function postExpand(id) {
    setClickedId(id);
    setPostExpand(true);
  }

  return (
    <div>
      {isExpanded || isEdit ? null : (
        <div class="HeadandLoad">
          <Header />
          {startLoading ? (
            <CircularProgress className="loader" color="inherit" />
          ) : null}
          <h2 class="below-box headUsername">Hello {isCurrentUser.username}</h2>
        </div>
      )}

     
      {isExpanded || isPostExpanded || isEdit ? null : (
        <HomeBtn HomeOnClick={HomeBtnExpand} />
      )}

      <Snackbar open={openSnack}>
        <SnackbarContent
          style={{
            backgroundColor: "white",
            color: "black",
            display: "center",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "10px",
            margin: "0% 26%",
            marginBottom: "15%",
          }}
          message={<span id="client-snackbar">Moment {snackType}</span>}
        />
      </Snackbar>

      {isExpanded ? (
        <CreateArea
          onAdd={onAdd}
          handleBackBtn={backBtn}
        />
      ) : null}

      {isExpanded || isPostExpanded || isEdit
        ? null
        : posts.length > 0
        ? posts.map((singlePost, index) => {
            us_id++;
            return (
              <ShortPost
                key={singlePost._id}
                id={singlePost._id}
                date={singlePost.date}
                time={singlePost.time}
                seenplace={singlePost.place}
                createdAt={singlePost.createdTime}
                callforUpdateGet={getAllPosts}
                postClick={postExpand}
              />
            );
          })
        : null}

      {isPostExpanded
        ? posts.map((singlePost, index) => {
            if (clickedID === singlePost._id) {
              console.log(clickedID + "And " + index);

              return (
                <Post
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
                  handleBackBtn={() => {
                    setPostExpand(false);
                  }}
                />
              );
            }
          })
        : null}

      {isEdit
        ? isPostExpanded
          ? null
          : posts.map((singlePost, index) => {
              if (clickedID === singlePost._id) {
                return (
                  <CreateArea
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
                );
              }
            })
        : null}
    </div>
  );
}
export default App;
