import { Avatar,IconButton } from '@material-ui/core';
import React,{useEffect,useState}from 'react';
import './Chat.css';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {InsertEmoticon, SearchOutlined} from '@material-ui/icons' ;
import SendIcon from '@material-ui/icons/Send';
import {useParams} from 'react-router-dom';
import db from './firebase';


function Chat() {
    const [Seed, setSeed]= useState("");
    const [input, setInput]= useState("");
    const {roomId} = useParams();
    const [roomName, setRoomName]= useState("");

    useEffect(() => {
       setSeed(Math.floor(Math.random() * 100)); 
    }, [roomId]);

    useEffect(() => {
      if (roomId){
          db.collection("rooms").doc(roomId).onSnapshot(snapshot => {
              setRoomName(snapshot.data().name)
           } )
      }
      
     }, [roomId]);
 

    const sendMessage = (e)=>{
        e.preventDefault();
        console.log(input);
        setInput("");
    }
    return (
       
        <div className="chat">
            <div className="chat_header">
                <Avatar src={`https://picsum.photos/id/${Seed}/200/200`}/>
                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen...</p>
                </div>
                <div className="char_headerRight">
                    <IconButton> <SearchOutlined/></IconButton>
                    <IconButton><MoreVertIcon/></IconButton>
                </div>
            </div>
            <div className="chat_body">
               
                <p className={`chat_message ${true && "chat_reciever"}`}>
                <span className="chat_name">Raj Kamal Nehul</span><br/>
                 Hey Guys 
                <span className="chat_timestamp">3:20PM</span>
                </p>
            </div>
            <div className="chat_footer">
                <InsertEmoticon/>
                <form>
                    <input value={input} onChange={e=>setInput(e.target.value)} type="text" placeholder="Type a message"/>
                    <button onClick={sendMessage} type="submit"><SendIcon/></button>
                </form>
            </div>
            
            
        
            
        </div>
    )
}

export default Chat;
