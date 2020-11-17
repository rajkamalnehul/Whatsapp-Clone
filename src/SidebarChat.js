/** @format */

import React, { useEffect, useState } from "react";
import "./sidebarchat.css";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";

function SidebarChat({ name, id }) {
  const [Seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 100));
  }, []);
  return (
    <Link className="link" to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://picsum.photos/id/${Seed}/200/200`} />
        <div className="rooms_info">
          <span>{name}</span>
          <p>Last message...</p>
        </div>
      </div>
    </Link>
  );
}

export default SidebarChat;
