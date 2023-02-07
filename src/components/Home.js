import React from 'react';
import './Navbar';
import './Post';
import { useAuthState } from 'react-firebase-hooks/auth';
import NewNavbar from './NewNavbar';
import Post from './Post';
import VideoPost from './VideoPost';
import ArticlePost from './Article'
import TopBanner from './TopBanner';
import { useEffect, useState } from 'react';
import { auth, db } from '.././firebase';
import { useParams } from 'react-router-dom';
import TextPost from './TextPost';

function Home() {
  const {roomId} = useParams();
  const [user] = useAuthState(auth);
  const [imagePost,setImagePost]=useState([]);
  const [textPost, setTextPost] = useState([]);
  const [videoPost, setVideoPost] = useState([]);
  const [articlePost, setArticlePost] = useState([]);

  useEffect(()=>{
    if(user?.uid){
      // db.collection('Posts').doc(user?.uid).onSnapshot((snapshot)=>(
      // setPosts(
      //   snapshot.id,
      //   snapshot.data(),
      // )));
      db.collection('Posts').doc(user?.uid).collection('TextPosts').orderBy("timestamp","desc").onSnapshot((snapshot)=>
      setTextPost(snapshot.docs.map((doc)=>doc.data())));
      db.collection('Posts').doc(user?.uid).collection('ImagePosts').orderBy("timestamp","desc").onSnapshot((snapshot)=>
      setImagePost(snapshot.docs.map((doc)=>(doc.data()))));
      db.collection('Posts').doc(user?.uid).collection('videoPosts').orderBy("timestamp","desc").onSnapshot((snapshot)=>
      setVideoPost(snapshot.docs.map((doc)=>(doc.data()))));
      db.collection('Posts').doc(user?.uid).collection('ArticlePosts').orderBy("timestamp","desc").onSnapshot((snapshot)=>
      setArticlePost(snapshot.docs.map((doc)=>(doc.data()))));
  }else{
        console.log("user not found")
    }
    // orderBy('timestamp','desc').
    // onSnapshot(snapshot=>{
    //   setPosts(snapshot.docs.map(doc=>({
    //     id:doc.id,
    //     post:doc.data(),
    //   }))); 
  },[user?.uid]);
  // console.log(user.uid);
  // console.log("post",textPost)
  return (
    <div>
      <div className="navbar"> 
        <NewNavbar/> 
      </div>
      
      <div className="mainOfMain">
        <div className='main'>
        <TopBanner/>
        <div className='vertical-line'/>
        {
          // posts.map((post)=>(
          //   <Post key={post.id} imageUrl={post.imageUrl} captionText={post.captionText} />
          // ))
          textPost.map(({textPost})=>(
            <TextPost key={textPost.id} TextPost={textPost}/>
          ))  
          }
        {
          imagePost.map((post)=>(
            <Post  key={post.id} captionText={post.captionText} imageUrl={post.imageUrl}/>
          ))
        }
         {
          videoPost.map((post)=>(
            <VideoPost  key={post.id} captionText={post.captionText} videoUrl={post.videoUrl}/>
          ))
        }
        {
          articlePost.map((post)=>(
            <ArticlePost  key={post.id} para={post.para} gradient={post.gradient} heading={post.heading}/>
          ))
        }
      </div>
      </div>

    </div>
  );
}

export default Home
