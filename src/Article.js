import { Avatar, makeStyles,Button,Modal } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import './Article.css'
import { BiLike,BiComment,BiShare, BiSend} from 'react-icons/bi';
import { AiTwotoneLike} from 'react-icons/ai';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from './firebase';
import firebase from 'firebase';
import { icons } from 'react-icons/lib';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',        
    },
}));
function Post({gradient,para,heading}) {
    const classes = useStyles();
    const [user]=useAuthState(auth);
    const [likeCount, setlikeCount] = useState(0);
    const [btnColor,setBtnColor]=useState('lightBlue');
    const [comment,setComment]=useState('');
    const [open, setOpen] = useState(false);
    const [getComment,setGetCommnet]=useState([])
    const userId=auth.currentUser.uid;
    useEffect(() => {
        if(userId ){
            db.collection('Posts').doc(userId).collection('Comments').orderBy('timestamp','desc').onSnapshot((snapshot)=>
                setGetCommnet(snapshot.docs.map((doc)=>doc.data())
            ))
        }
    }, [])
    const addComment=()=>{
        if(userId){
            db.collection('Posts').doc(userId).collection('Comments').add({
                userName:user?.displayName,
                user:userId,
                comment:comment,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
            handleClose();
        }
    }
    
    const numOfLike=()=>{
        setBtnColor('blueviolet');
        if(btnColor=='lightBlue'){
            setlikeCount((num)=>{
                let newNum=num+1;
                return newNum;
             });
        }
            
    }


    const body = (
        <div className='img-container' >
            <input type="text"  placeholder='Write comment' onChange={(event)=>setComment(event.target.value)} value={comment} className='comment-text'/>
            <Button color="primary" type="submit" variant="contained" onClick={addComment} className="upload-btn">upload</Button>
        </div>
  );

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
    return (
        <div className="post" >
            <div className="post_header">
                <Avatar alt={user?.displayName} src={user.photoURL} className="profile-logo"/>
                <div className='user-info'>
                    <h3 className="userName">{user.displayName}</h3>
                    <p>software Engineer at Google-II</p> 
                </div>
            </div>
            <div className="post-container" style={{backgroundImage:gradient}}>
                <h4 className="heading">{heading}</h4>
                 <p className="para">{para}</p>
            </div>
           
            <div className='post-icons'>
                <div className='icons-field'>
                    <AiTwotoneLike  style={{color:btnColor}} className="like-icon" onClick={()=>numOfLike()}/>
                    <h4>{likeCount} Like</h4>
                </div>
                <div className='icons-field' >
                    <BiComment className="icon" onClick={handleOpen}/>
                    <h4>Comment</h4>
                </div>
                <div className='icons-field'>
                    <BiShare className="icon"/>
                    <h4>Share</h4>
                </div>
                {/* <div className='icons-field'>
                    <BiSend className="icon"/>
                    <h4>Send</h4>
                </div> */}
            </div>
            {
                getComment.map((cmt)=>(
                <div className="comment-section">
                    <h4>{cmt.userName}</h4>
                    <p>{cmt.comment}</p>
                </div>
                ))
            }
      
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition>
             {
             
            //  auth.username ?
              body 
            //  : text
             }
            </Modal>
        </div>
    )
}

export default Post
 