import React,{useState} from 'react';
import './sidebar.css';
import {Avatar, IconButton,Drawer} from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {SearchOutlined} from '@material-ui/icons' ;
import SidebarChat from './SidebarChat.js';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import GroupAddRoundedIcon from '@material-ui/icons/GroupAddRounded';



function Sidebar() {
    const[open,setOpen]= useState(false);
    const handleDrawer =()=>{
        setOpen(true);
    }
    return (
      
        <div className="sidebar">
          
            <div className="sidebar_header">
                <Avatar/>
                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLargeIcon/>
                    </IconButton>    
                    <IconButton onClick={handleDrawer}>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>     
                 </div>
            </div>
            <div className="sidebar_search">
            <div className="search_container">
                    <SearchOutlined/>
                    <input placeholder="Search or Start new chat" type="text"/>
            </div> 
            </div>
            <div className="sidebar_chat">
                <SidebarChat/>
                <SidebarChat/>
                <SidebarChat/>
                <SidebarChat/>
               
            </div>
        
          
           <Drawer  variant="persistent" anchor='left' open={open} onClose={()=>setOpen(false)}> 
           <div className="slider">
           <div className="slider_header">
               <div className="slider_headerContent">
                   <IconButton onClick={()=>setOpen(false)}>
                       <ArrowBackIcon/>
                   </IconButton> 
                   <span>New Chat</span>
               </div>
   
           </div>
           <div className="sidebar_search">
               <div className="search_container">
                   <SearchOutlined/>
                   <input placeholder="Search Rooms" type="text"/>
               </div> 
           </div>
           <div className="add_newRoom">
               <div className="groupIcon"> <GroupAddRoundedIcon/>
               </div>
               <input placeholder="Add New Group" type="text"/>
           </div>

            </div>
           
           </Drawer>
         
        
                
        
            </div>
    
            
            
        
       
      
    )
}

export default Sidebar;
