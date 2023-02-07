import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import logo from '../logo-icon.svg'
import { useHistory } from 'react-router';
import { useEffect } from 'react';
import { auth, db } from '.././firebase';

function SignUp() {
    const history=useHistory();
    const [email, setEmail] = useState(['']);
    const [password, setPassword] = useState(['']);
    const [userName, setUserName] = useState(['']);  
    const [user,setUser]=useState(null);
 
    const userId=auth.currentUser.uid;
  const signUp=(e)=>{
    e.preventDefault();
        auth.createUserWithEmailAndPassword(email,password).then((authUser)=>{
            return authUser.user.updateProfile({
                displayName:userName,
            })  ,          
            signUpData(),
            history.push('/home');
        }).catch((e)=>alert(e.message));
  }


  useEffect(() => {
    
    const unsubscribe=auth.onAuthStateChanged((authUser) => {
        if(authUser){
          setUser(authUser);
        }else{
           setUser(null);
        } 
    })
    return ()=>{
      unsubscribe();
    }
  }, [user,userName]);


const signUpData=()=> {
  db.collection('user').doc(userId).set({
      UserName:userName,
      Email:email,  
      Password:password,
    }).then((docRef)=>{
      alert('Signed-Up successfully!!',docRef.uid);
    }).catch((e)=>{
      console.log('fail to sign-up')
    })
}


  // useEffect(() => {
    
  // }, [])
  return (
    <div className='container'>
      <div className='signUpPage'>
        
          <img className="logoImage" src={logo} alt="logo"/>
          <input type="text"
          className='signUp-input-field'
          placeholder="Enter UserName" 
          value={userName} 
          onChange={(e)=>setUserName(e.target.value)}/>

          <input type="email"
          placeholder="Enter Email" 
          value={email} 
          className='signUp-input-field'       
          onChange={(e)=>setEmail(e.target.value)}/>
          
          <input type="password"
          placeholder="Enter Password" 
          value={password} 
          className='signUp-input-field'      
          onChange={(e)=>setPassword(e.target.value)}/>
       
        
        <div className="signUpBtn">
        <Button color="primary" type="submit" variant="contained" onClick={signUp} className="signUp-btn">sign Up</Button>
        </div>
        <h2 className='signup-h2'>if already a user then </h2>
        <div className="signUpBtn">
        <Button color="primary" type="submit"  variant="contained" className="signUp-btn" onClick={()=>{history.push('/signin')}}>Sign in</Button>
        </div>
      </div>
    </div>
  );
}
export default SignUp;