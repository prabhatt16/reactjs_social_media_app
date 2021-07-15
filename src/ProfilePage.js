import React from 'react'
import Button from '@material-ui/core/Button'
import './ProfilePage.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import { useHistory } from 'react-router-dom';
import { hslToRgb } from '@material-ui/core';

function ProfilePage() {
    const history=useHistory();
    const [user]=useAuthState(auth);
    const logOut=()=>{
        auth.signOut().then(() => {
            alert("Sign-outed successfully");
            history.push('/signIn')
            }).catch((error) => {
            // An error happened.
            alert('error to sign-out :/');
            });
    }
    return (
        <div className="profile_container">
            <div className="profile_header">
                <div className="header_items">
                        <img src={user?.photoURL} onClick={()=>history.push("/home")} alt="profilePic"/>
                        <div className="header_right">
                            <h2>{user?.displayName}</h2>
                            <p>Software developer</p>
                            <div className="friendCount">
                                <h4>152</h4>
                                <p> friends</p>
                            </div>  
                            <div className="btn_container">
                            <Button variant="contained" style={{width:'65px',height:'30px',marginRight:'5px'}} color="primary">Edit</Button>
                            <Button variant="contained" style={{width:'70',height:'30px'}} onClick={logOut} color="primary">Logout</Button>

                            </div>
                        </div>
                </div>
            </div>
            <div className="posts_container">
                <h2>Posts</h2>
            </div>
        </div>
    )
}

export default ProfilePage
