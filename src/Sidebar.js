/** @format */

import React, { useState, useEffect } from "react";
import "./sidebar.css";
import { Avatar, IconButton, Drawer } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import SidebarChat from "./SidebarChat.js";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import GroupAddRoundedIcon from "@material-ui/icons/GroupAddRounded";
import db from "./firebase";
import { useStateValue } from "./StateProvider";

function Sidebar() {
  const [open, setOpen] = useState(false);
  const [drawerInput, setdrawerInput] = useState("");
  const [rooms, setRooms] = useState([]);
  const [searchField, setSearcField] = useState("");
  const [FilteredRooms, setFilteredRooms] = useState([]);

  /*const handleChange = (e) => {
    let filteredRooms = rooms.filter((eachroom) => {
      return eachroom.data.name
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
        
    });
    setFilteredRooms(filteredRooms);
    setSearcField(e.target.value);
    // if (e.target.value === "") {
    //   setFilteredRooms(rooms);
    // } else {
    //   setFilteredRooms(filteredRooms);
    // }
    console.log(FilteredRooms);
    console.log(filteredRooms);
  };*/

  const handleDrawer = () => {
    setOpen(true);
  };
  const [{ user }, dispatch] = useStateValue();

  const addNewRoom = () => {
    db.collection("rooms").add({
      name: drawerInput,
    });
    setdrawerInput("");
    setOpen(false);
  };

  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) => {
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) => {
      setFilteredRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  useEffect(() => {
    const filteredRooms = rooms.filter((eachroom) =>
      eachroom.data.name.toLowerCase().includes(searchField.toLowerCase())
    );
    setFilteredRooms(filteredRooms);
    //console.log(searchField);
    //console.log(FilteredRooms);
  }, [searchField]);

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton onClick={handleDrawer}>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="search_container">
          <SearchOutlined />
          <input
            placeholder="Search or Start new chat"
            type="text"
            value={searchField}
            onChange={(e) => setSearcField(e.target.value)}
          />
        </div>
      </div>
      <div className="sidebar_chat">
        {FilteredRooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>

      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className="slider">
          <div className="slider_header">
            <div className="slider_headerContent">
              <IconButton onClick={() => setOpen(false)}>
                <ArrowBackIcon />
              </IconButton>
              <span>New Chat</span>
            </div>
          </div>
          <div className="sidebar_search">
            <div className="search_container">
              <SearchOutlined />
              <input placeholder="Search Rooms" type="text" />
            </div>
          </div>
          <div className="add_newRoom">
            <div className="groupIcon" onClick={addNewRoom}>
              {" "}
              <GroupAddRoundedIcon />
            </div>
            <input
              value={drawerInput}
              onChange={(e) => setdrawerInput(e.target.value)}
              placeholder="Add New Group"
              type="text"
            />
          </div>
        </div>
      </Drawer>
    </div>
  );
}

export default Sidebar;
