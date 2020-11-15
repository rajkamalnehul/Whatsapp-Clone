import { Button } from '@material-ui/core';
import React from 'react';
import './login.css';
import{auth,provider} from './firebase.js';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';


function Login() {
    const[{ }, dispatch] = useStateValue();
    const signIn =()=>{
        auth.signInWithPopup(provider).then(result=>
            {dispatch({
                type:actionTypes.SET_USER,
                user: result.user,
            })}).catch((error)=>alert(error.message));
        }

    return (
        <div className="login">
          <div className="login_container">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="whatsapp_image"/>
           
                <h1>Sign in to WhatsApp</h1>
        
            <Button onClick={signIn} >
            Sign In With Google</Button>
          
            </div>
        </div>
    )
}

export default Login;
