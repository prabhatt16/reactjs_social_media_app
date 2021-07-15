import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import './LoginPage.css'
import logo from './logo-icon.svg'
import { auth } from './firebase';
import { useHistory } from 'react-router';
import { useEffect } from 'react';

function LoginPage() {
    const history=useHistory();
    const [email, setEmail] = useState(['']);
    const [password, setPassword] = useState(['']);
    const [user,setUser]=useState(null);
  
    const login=(event)=>{
      event.preventDefault();
      auth.signInWithEmailAndPassword(email,password).then(()=>{
          history.push('/home');
      }).catch((e)=>alert(e.message));
    }

  // useEffect(() => {
    
  //   const unsubscribe=auth.onAuthStateChanged((authUser) => {
  //     if(authUser){
  //       setUser(authUser);
  //       // if(authUser.displayName){
  //       // }else{
  //       //   return authUser.updateProfile({
  //       //     displayName:userName,
  //       //   })
  //       // }
  //     }else{
  //       setUser(null);
  //     }
  //   })
  //   return ()=>{
  //     unsubscribe();
  //   }
  // }, [user,userName]);
  return (
    <div className='container'>
      <div className='LoginPage'>
        <form onSubmit={login}>
          <img className="logoImage" src={logo} alt="logo"/>
          <input type="email"
          placeholder="Enter Email" 
          value={email} 
          className='Login-input-field'       
          onChange={(e)=>setEmail(e.target.value)}
          required/>  
          
          <input type="password"
          placeholder="Enter Password" 
          value={password} 
          className='Login-input-field'      
          onChange={(e)=>setPassword(e.target.value)}
          required/>

          <div className="LoginBtn">
          <Button color="primary" type="submit" onClick={login} variant="contained" className="Login-btn">Login</Button>
          </div>
        </form> 
      </div>
    </div>
  );
}
export default LoginPage;