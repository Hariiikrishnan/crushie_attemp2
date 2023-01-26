import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import "./stylesComponent.css";
import CircularProgress from "@mui/material/CircularProgress";

function Post(props) {
  const [isLoading, setLoading] = useState(false);

  const deleteButton = {
    left: "60%",
  };

  return (
    <div className="post">
      <div className="backButton">
        <Fab
          onClick={() => {
            props.handleBackBtn();
          }}
        >
          <span class="material-symbols-outlined">close</span>
        </Fab>
        <br></br>
      </div>
      <div className="postHead fullPost">
        <h2>{props.date}</h2>
        <h2>{props.time}</h2>
      </div>
      <label>Where did you Saw her ?</label>
      <h3>{props.seenplace}</h3>
      <label>Dress Color :</label>
      <h3>{props.dresscolor}</h3>
      <label>Did She Saw You ?</label>
      <h3>{props.shesaw}</h3>
      <label>How did i React ?</label>
      <h3>{props.reaction}</h3>

      <div className="backButton onlyEdit">
        <Fab
          onClick={() => {
            props.onEdit(props.id);
          }}
          className="editpen"
        >
          <span class="material-symbols-outlined editPen">edit</span>
        </Fab>

        <Fab
          onClick={() => {
            setLoading(true);
            props.OnDelete(props.id);
          }}
          style={deleteButton}
          className="deleteHeart"
        >
          <span class="material-symbols-outlined ">heart_minus</span>
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
    </div>
  );
}

export default Post;
