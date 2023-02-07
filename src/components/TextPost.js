import { Avatar } from '@material-ui/core'
import React, { useState } from 'react'
import { BiLike,BiComment,BiShare, BiSend} from 'react-icons/bi';
import {AiTwotoneLike} from 'react-icons/ai';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '.././firebase';



function TextPost({TextPost}) {
    const [likeCount, setlikeCount] = useState(0);
    const [user]=useAuthState(auth);
    const [btnColor,setBtnColor]=useState('lightBlue');
    const numOfLike=()=>{
        if(btnColor=='lightBlue')
        {
            setBtnColor('blueviolet');
            setlikeCount((num)=>{
                let newNum=num+1;
                return newNum;
            });
            if(user.uid){
    
            }
        }

    }
    return (
        <div className="post">
            <div className="post_header">
                <Avatar alt={user?.displayName} src={user.photoURL} className="profile-logo"/>
                <div className='user-info'>
                    <h3 className="userName">{user?.displayName}</h3>
                    <p>software Engineer at Google-II</p> 
                </div>
                 
            </div>
            <div className="textPostarea">
                <h5 className="textPost">{TextPost}</h5>
            </div>
            <div className='post-icons'>
                <div className='icons-field'>
                    <AiTwotoneLike style={{color:btnColor}} className="icon" onClick={()=>numOfLike()}/>
                    <h4>{likeCount} Like</h4>
                </div>
                <div className='icons-field'>
                    <BiComment className="icon"/>
                    <h4>Comment</h4>
                </div>
                <div className='icons-field'>
                    <BiShare className="icon"/>
                    <h4>Share</h4>
                </div>
              
            </div>
        </div>
    )
}

export default TextPost
 