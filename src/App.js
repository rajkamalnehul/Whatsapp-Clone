import React from 'react';
import './App.css';
import Sidebar from './Sidebar.js';
import Chat from './Chat.js';

function App() {
  return (
    <div className="App">
     
     <div className="app_body">
        <Sidebar/>
        <Chat/>
        
     </div>
    </div>
  );
}

export default App;
