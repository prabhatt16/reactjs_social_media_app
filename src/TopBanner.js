import { Avatar, Button, makeStyles, Modal } from '@material-ui/core';
import React, { useState } from 'react'
import './TopBanner.css'
import { BiSend } from 'react-icons/bi';
import { BsCardImage,BsFileText } from 'react-icons/bs';
import { FaYoutube } from 'react-icons/fa';
import { GrArticle } from 'react-icons/gr';
import {storage, db, auth} from './firebase';
import firebase from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const useStyles = makeStyles((theme) => ({
   modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}));
function TopBanner() {
    const classes = useStyles();
    // const [modalStyle] = React.useState(getModalStyle);
    const allInputs = {imgUrl: ''}
    const [user]=useAuthState(auth);
    const [image,setImage]=useState('');
    const [video,setVideo]=useState('');
    const [vOpen,setVOpen]=useState(false);
    const [aOpen,setAOpen]=useState(false);
    const [open, setOpen] = useState(false);
    const [inputPost, setInputPost] = useState('');
    const [videoAsUrl, setVideoAsUrl] = useState({vidUrl:''});
    const [imageAsUrl, setImageAsUrl] = useState({imgUrl:''});
    const [vCaption,setVCaption]=useState('');
    const [caption, setCaption] = useState('')
    const [heading, setHeading] = useState('')
    const [para, setPara] = useState('')
    const [gradient, setGradient] = useState('white');
    const userId=auth.currentUser.uid;


    const oneGradient=()=>{
      setGradient('linear-gradient(to bottom right, cyan, white)');
    }
    const twoGradient=()=>{
      setGradient('linear-gradient(to bottom right, lightpink, lightyellow)');
    }
    const threeGradient=()=>{
      setGradient('linear-gradient(to bottom right, white, lightgray)');
    }
    //------------------------------------------

    //article uploading.....
 const handleAOpen = () => {
      setAOpen(true);
    };
    const handleAClose = () => {
      setAOpen(false);
    };
  const uploadArticlePost=async(e)=>{
    e.preventDefault();
    if(userId && para!=" " && heading!=' '){
     await db.collection('Posts').doc(userId).collection('ArticlePosts').add({
      para: para,
      heading:heading,
      gradient:gradient,
      user:userId,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      userName: user.displayName,
      userImage: user.photoURL
    }).then((e)=>{
        console.log(e);
    }).catch((e)=>{
        alert(e.message);
    })
    }else{
        alert('your message is empty :/, if not may be data base error(try again)');
    }
    setPara('');
    setHeading('');
    handleAClose();
  }
   
//=======================================================================================
    // video uploading 
      
  const handleVOpen = () => {
      setVOpen(true);
    };
  const handleVClose = () => {
      setVOpen(false);
    };

  
  const handleVChange = (e) => {
    // if (e.target.files.length) {
    //   console.log(e.target.files);
    //   setImage({
    //     raw: e.target.files[0],
    //   });
    // } else console.log('upload img');
     const video = e.target.files[0]
      setVideo(videoFile => (video))
  };



  const handleVUpload = (e)=>{
  
    e.preventDefault()
    // async magic goes here...
    if(video === '') {
      console.error(`not an video, the video file is a ${typeof(video)}`)
    }
    const uploadTask = storage.ref(`/videos/${video.name}`).put(video); 
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED, 
    (snapShot) => {
      console.log(snapShot)
    }, (err) => {
      console.log(err)
    }, async(e) => {
      await storage.ref('videos').child(video.name).getDownloadURL().then((fireBaseUrl) => {
        setVideoAsUrl({vidUrl: fireBaseUrl});
        console.log("video url",fireBaseUrl);
        if(userId){
         db.collection('Posts').doc(userId).collection('videoPosts').add({
          captionText:vCaption,         
          user:userId,
          videoUrl:fireBaseUrl,
          userName:user.displayName,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        }); 
        }else{
          alert(e.message);
        }
        setVCaption('');
        setVideo(null);
        handleVClose();
      }).catch((error) => console.log(error));
      
    })
  }

  console.log(videoAsUrl);

    //-------------------------------------------------------------------------------------------------------------------

  const handleOpen = () => {
    setOpen(true);
  };

  const uploadTextPost=async(e)=>{
    e.preventDefault();
    if(userId && inputPost!=""){
     await db.collection('Posts').doc(userId).collection('TextPosts').add({
      textPost: inputPost,
      user:userId,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      userName: user.displayName,
      userImage: user.photoURL
    }).then((e)=>{
        console.log(e);
    }).catch((e)=>{
        alert(e.message);
    })
    }else{
        alert('your message is empty :/, if not may be data base error(try again)');
    }
    setInputPost('');
  }

  const handleChange = (e) => {
    // if (e.target.files.length) {
    //   console.log(e.target.files);
    //   setImage({
    //     raw: e.target.files[0],
    //   });
    // } else console.log('upload img');
     const image = e.target.files[0]
      setImage(imageFile => (image))
  };


  const handleUpload = (e)=>{
  
    e.preventDefault()
    console.log('start of upload')
    // async magic goes here...
    if(image === '') {
      console.error(`not an image, the image file is a ${typeof(image)}`)
    }
    const uploadTask = storage.ref(`/images/${image.name}`).put(image); 
    uploadTask.on(
      'state_changed', 
    (snapShot) => {
      console.log(snapShot)
    }, (err) => {
      console.log(err)
    }, async(e) => {
      await storage.ref('images').child(image.name).getDownloadURL().then((fireBaseUrl) => {
        setImageAsUrl({imgUrl: fireBaseUrl});
        if(userId){
         db.collection('Posts').doc(userId).collection('ImagePosts').add({
          captionText:caption,
          user:userId,
          imageUrl:fireBaseUrl,
          userName:user.displayName,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        }); 
        }else{
          alert(e.message);
        }
        setCaption('');
        setImage(null);
        handleClose();
      }).catch((error) => console.log(error));
      
    })
  }

  console.log(imageAsUrl);
  

  const handleClose = () => {
    setOpen(false);
  };


    const body = (
          <div className='img-container'>
              <input type="text"  placeholder='Write caption' onChange={(event)=>setCaption(event.target.value)} value={caption} className='caption-text'/>
              <input type="file" onChange={handleChange} />
              <Button color="primary" type="submit" onClick={handleUpload} variant="contained" className="upload-btn">upload</Button>
          </div>
    );
  const aBody = (
        <div className='article-container'>
            <input type="text"  placeholder='Write heading' onChange={(event)=>setHeading(event.target.value)} value={heading} className='heading-text'/>
            <input type="text"  placeholder='Write Para' onChange={(event)=>setPara(event.target.value)} value={para} className='caption-text'/>
            <div className="gradient">
              <div className="one-container" onClick={oneGradient}>1</div>
              <div className="two-container" onClick={twoGradient}>2</div>
              <div className="three-container" onClick={threeGradient}>3</div>
              <div className="main-container" style={{backgroundImage:gradient}} />
            </div>
            <Button color="primary" type="submit" onClick={uploadArticlePost} variant="contained" className="upload-btn">upload</Button>
        </div>
  );
    const vBody = (
        <div className='img-container'>
            <input type="text"  placeholder='Write caption' onChange={(event)=>setVCaption(event.target.value)} value={vCaption} className='caption-text'/>
            <input type="file" onChange={handleVChange} />
            <Button color="primary" type="submit" onClick={handleVUpload} variant="contained" className="upload-btn">upload</Button>
        </div>
  );
  const text = (
        <h3>Login to upload :/</h3>
  );
    return (
        <div className="banner">
            <div className='input-field'>
                <Avatar alt={user?.displayName} src={user?.photoURL} className="banner-profile"/>
                <input type="text" placeholder='write something..' onChange={(e)=>setInputPost(e.target.value)} value={inputPost}/>
                <BiSend className='banner-icon' onClick={uploadTextPost}/>
            </div>
            <div className="post-field">
                <div className='field'>
                    <BsCardImage className='banner-icon' onClick={handleOpen}/>
                    <h3>Photo</h3>
                </div>
                <div className='field'>
                    <FaYoutube className='banner-icon' onClick={handleVOpen}/>
                    <h3>Video</h3>
                </div>
                <div className='field'>
                    <BsFileText className='banner-icon' onClick={handleAOpen}/>
                    <h3>Article</h3>
                </div>  
            </div>
            <Modal
                onSubmit={handleUpload}
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
            <Modal
                onSubmit={handleVUpload}
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={vOpen}
                onClose={handleVClose}
                closeAfterTransition>
             {
             
            //  auth.username ?
              vBody 
            //  : text
             }
            </Modal>
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={aOpen}
                onClose={handleAClose}
                closeAfterTransition>
             {
             
            //  auth.username ?
              aBody 
            //  : text
             }
            </Modal>
        </div>
    )
}

export default TopBanner
