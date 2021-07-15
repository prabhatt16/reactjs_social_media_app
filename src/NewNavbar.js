import React, { useEffect, useState } from 'react'
import {FaHistory} from 'react-icons/fa';
import {FiHelpCircle} from 'react-icons/fi';
import Avatar from '@material-ui/core/Avatar';
import './NewNavbar.css'
import { auth, db } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useHistory } from 'react-router-dom';
import media from './media.png'
function NewNavbar() {
    const [user]=useAuthState(auth);
   
    const history= useHistory();
    const [show, handleshow] = useState(false);
    // useEffect(() => {
    
    //     window.addEventListener('scroll',()=>{
    //         if(window.scrollY>100){
    //             handleshow(true);
    //         }else{
    //             handleshow(false);
    //         }
    //     });
    //     return ()=>{
    //         window.removeEventListener('scroll');
    //     };
    
    // }, [])

    return (
        <div className={`header ${show}nav-color`}>
            <div className="left-header">
                <img src={media} alt="logo"/>
                <h4>Maddy</h4>
            </div>
            <div className="search-header">
                <input type="text" placeholder='search'/>
            </div>
            <div className="header-profile">
                <Avatar alt={user?.displayName} 
                src={user?.photoURL} onClick={()=>history.push("/profile")}/>
            </div>
            
        </div>
    )
}

export default NewNavbar
