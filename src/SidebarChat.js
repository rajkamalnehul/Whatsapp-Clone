/** @format */

import React, { useEffect, useState } from "react";
import "./sidebarchat.css";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import db from "./firebase";

function SidebarChat({ name, id }) {
  const [messages, setMessages] = useState("");
  const [Seed, setSeed] = useState("");

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, []);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 100));
  }, []);
  return (
    <Link className="link" to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://picsum.photos/id/${Seed}/200/200`} />
        <div className="rooms_info">
          <span>{name}</span>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  );
}

export default SidebarChat;
