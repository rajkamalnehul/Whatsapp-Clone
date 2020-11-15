import React,{useState,useEffect} from 'react';
import './sidebar.css';
import {Avatar, IconButton,Drawer} from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {SearchOutlined} from '@material-ui/icons' ;
import SidebarChat from './SidebarChat.js';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import GroupAddRoundedIcon from '@material-ui/icons/GroupAddRounded';
import db from './firebase';
import { useStateValue } from './StateProvider';



function Sidebar() {
    const[open,setOpen]= useState(false);
    const[drawerInput,setdrawerInput] = useState("");
    const [rooms,setRooms]= useState([]);
    const handleDrawer =()=>{
        setOpen(true);
    }
    const [{user},dispatch] = useStateValue();

    const addNewRoom =()=>{
        db.collection("rooms").add({
            name:drawerInput
        });
        setdrawerInput("");
        setOpen(false);
    }

  
    
    useEffect(() => {
       db.collection("rooms").onSnapshot((snapshot)=>{
           setRooms(snapshot.docs.map((doc) =>({
               id: doc.id,
               data:doc.data(),
           })))
        });
      
     }, []);
   
    return (
      
        <div className="sidebar">
          
            <div className="sidebar_header">
                <Avatar src={user?.photoURL} />
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
               { 
                rooms.map(room => (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name} />
                ))
               }
               
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
               <div className="groupIcon" onClick={addNewRoom}> <GroupAddRoundedIcon/>
               </div>
               <input value={drawerInput} onChange={e=>setdrawerInput(e.target.value)} placeholder="Add New Group" type="text"/>
           </div>

            </div>
           
           </Drawer>
         
        
                
        
            </div>
    
            
            
        
       
      
    )
}

export default Sidebar;
