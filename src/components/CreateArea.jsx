import React, { useState, useContext } from "react";

import SaveAltIcon from "@mui/icons-material/SaveAlt";
import Fab from "@mui/material/Fab";
import CircularProgress from "@mui/material/CircularProgress";
import { TimeStampContext } from "../login/TimeStamp.jsx";
import axios from "axios";

import { AuthContext } from "../login/Auth.jsx";
import { UserContext } from "../login/CurrentUser.jsx";

function CreateArea(props) {
  const [localtime, setTimeStamp] = useContext(TimeStampContext);

  const [post, setPost] = useState({
    createdTime: new Date(),
    date: "",
    time: "",
    place: "",
    color: "",
    saw: "",
    response: "",
  });
  const [editPost, setEditPost] = useState();
  const [isLoading, setLoading] = useState(false);

  const [authState] = useContext(AuthContext);
  const [isCurrentUser, setCurrentUser] = useContext(UserContext);

  function handleForm(event) {
    console.log("Handling Form");
    event.preventDefault();
    setLoading(true);
    props.isEdit ? handleUpdate(props.id) : onSubmit(event);
  }
  async function onSubmit(e) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authState,
      },
    };
    try {
      const body = JSON.stringify(post);
      await axios
        .post(
          `https://starfish-app-uva3q.ondigitalocean.app/crushie/moments/${isCurrentUser.u_id}`,
          body,
          config
        )
        .then((res) => {
          props.onAdd(res.data);
        });
      setPost({
        date: "",
        time: "",
        place: "",
        color: "",
        saw: "",
        response: "",
      });
      setLoading(false);
    } catch (err) {
      console.error("error ", err.res.data);
    }
  }
  async function handleUpdate(id) {
    console.log(id + " from client side edit route!");
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + authState,
      },
    };
    try {
      const body = JSON.stringify(editPost);
      console.log(body);
      await axios.post(
        `https://starfish-app-uva3q.ondigitalocean.app/crushie/moments/edit/${id}`,
        body,
        config
      );
    } catch (err) {
      console.error("error ", err.res.data);
    }
    props.onUpdate(editPost);
  }

  function handleChange(event) {
    const { value, name } = event.target;
    setPost((prevNotes) => {
      return { ...prevNotes, [name]: value };
    });
  }
  function handleEdit(event) {
    const { value, name } = event.target;
    setEditPost((prevNotes) => {
      return { ...prevNotes, [name]: value };
    });
  }

  return (
    <div className="createArea">
      <form class="create-form" validate="true">
        <div className="backButton createArea">
          <Fab
            onClick={() => {
              props.handleBackBtn();
            }}
          >
            <span class="material-symbols-outlined">close</span>
          </Fab>
        </div>
        <label>Date and Time:</label>

        <input
          onChange={props.isEdit ? handleEdit : handleChange}
          type="date"
          name="date"
          defaultValue={props.isEdit ? props.date : null}
          required={true}
          autoComplete="off"
        />
        <input
          onChange={props.isEdit ? handleEdit : handleChange}
          type="time"
          name="time"
          defaultValue={props.isEdit ? props.time : null}
          required={true}
          autoComplete="off"
        />
        <label>Where did you Saw her?</label>
        <input
          onChange={props.isEdit ? handleEdit : handleChange}
          name="place"
          placeholder="Place"
          defaultValue={props.isEdit ? props.seenplace : null}
          required={true}
          autoComplete="off"
        />
        <label>Dress Color:</label>
        <input
          onChange={props.isEdit ? handleEdit : handleChange}
          name="color"
          placeholder="Color"
          defaultValue={props.isEdit ? props.dresscolor : null}
          required={true}
          autoComplete="off"
        />
        <label>Did She Saw You?</label>
        <input
          onChange={props.isEdit ? handleEdit : handleChange}
          name="saw"
          placeholder="Did she?"
          defaultValue={props.isEdit ? props.shesaw : null}
          required
          autoComplete="off"
        />
        <label>How did i React?</label>
        <input
          onChange={props.isEdit ? handleEdit : handleChange}
          name="response"
          placeholder="How?"
          defaultValue={props.isEdit ? props.reaction : null}
          required
          autoComplete="off"
        />
        <div className="saveBtn">
          <Fab onClick={handleForm} type="submit">
            <SaveAltIcon />
            {isLoading && (
              <CircularProgress
                size={68}
                sx={{
                  position: "absolute",
                  top: -6,
                  left: -6,
                  zIndex: 1,
                }}
              />
            )}
          </Fab>
        </div>
      </form>
    </div>
  );
}

export default CreateArea;
