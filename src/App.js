import React,{useState} from 'react';
import './App.css';
import Sidebar from './Sidebar.js';
import Chat from './Chat.js';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from './Login.js';
import { useStateValue } from './StateProvider';

function App() {
 
  const[{user}, dispatch] = useStateValue();

  return (
    <div className="App">
    {!user ? (
     <Login/>
    ):(
      <div className="app_body">
      <BrowserRouter>
       <Sidebar/>
         <Switch>
           <Route  path="/rooms/:roomId">
             <Chat/>
           </Route>
         </Switch>
      </BrowserRouter>
        </div>

    )}
   
    </div>
  );
}

export default App;
