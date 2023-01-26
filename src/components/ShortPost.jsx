import React, { useState, useEffect, useContext } from "react";

import { TimeStampContext } from "../login/TimeStamp.jsx";

function ShortPost(props) {
  const [localtime, setTimeStamp] = useContext(TimeStampContext);

  console.log(localtime + " localtime variable");
  return (
    <div
      className="shortPost"
      onClick={() => {
        props.postClick(props.id);
      }}
    >
      <div className="postHead shortpost">
        <h2>{props.date}</h2>
        <h2>{props.time}</h2>
      </div>
      <h1 class="post-place">{props.seenplace}</h1>
      <div class="postFoot"></div>
    </div>
  );
}

export default ShortPost;
