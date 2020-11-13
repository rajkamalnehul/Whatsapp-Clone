import React,{useEffect,useState}from 'react';
import './sidebarchat.css';
import {Avatar} from '@material-ui/core';


function SidebarChat() {
    const [Seed, setSeed]= useState("");

    useEffect(() => {
       setSeed(Math.floor(Math.random() * 1000)); console.log(Seed);
    }, []);
    return (
        <div className="sidebarChat">
            <Avatar src={`https://picsum.photos/id/${Seed}/200/200`}/>
            <div className="rooms_info">
                <span>Room Info</span>
                <p>Last message...</p>
            </div>
            
            
        </div>
    )
}

export default SidebarChat;
