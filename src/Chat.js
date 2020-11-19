/** @format */

import { Avatar, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./Chat.css";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { InsertEmoticon, SearchOutlined } from "@material-ui/icons";
import SendIcon from "@material-ui/icons/Send";
import { useParams } from "react-router-dom";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from "firebase";
import Picker from "emoji-picker-react";
import Popper from "@material-ui/core/Popper";
//import Paper from "@material-ui/core/Paper";

function Chat() {
  const [Seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  const [anchorEl, setAnchorEl] = useState(null);
  const [chosenEmoji, setChosenEmoji] = useState("");

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject.emoji);
    console.log(chosenEmoji);
    setInput(chosenEmoji);
  };

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 100));
  }, [roomId]);

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRoomName(snapshot.data().name);
        });

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={`https://picsum.photos/id/${Seed}/200/200`} />
        <div className="chat_headerInfo">
          <h3>{roomName}</h3>
          <p>
            Last seen{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="chat_headerRight">
          <IconButton>
            {" "}
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        {messages.map((message) => (
          <p
            className={`chat_message ${
              message.name === user.displayName && "chat_reciever"
            }`}
          >
            <span
              className={
                message.name === user.displayName
                  ? "chat_name_reciever"
                  : "chat_name"
              }
            >
              {message.name}
            </span>
            <br />
            {message.message}
            <span className="chat_timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat_footer">
        <InsertEmoticon
          aria-describedby={id}
          type="button"
          onClick={handleClick}
        />

        <Popper id={id} open={open} anchorEl={anchorEl} placement={"top-start"}>
          <div>
            <Picker onEmojiClick={onEmojiClick} />
          </div>
        </Popper>

        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <button onClick={sendMessage} type="submit">
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
