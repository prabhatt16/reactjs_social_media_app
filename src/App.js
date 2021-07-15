import './App.css';
import Home from './Home';
import  { BrowserRouter as Router ,Route, Switch } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import GoogleSignIn from './GoogleSignIn';
// import { UserContext } from './User';
import ProfilePage from './ProfilePage';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from './Loading';
import { auth, db } from './firebase';
function App() {

  const [user, loading] = useAuthState(auth); 
  useEffect(() => {
      if (auth && user) {
        db.collection("Users").doc(user?.uid).set({
          accountType: "normal",
          email: user?.email,
          name: user?.displayName,
          profilePic: user?.photoURL,
          phone: user?.phoneNumber,
        });
      }
    });

  return(
    <div className="App">
      <Router>
        {
          !user?
          <GoogleSignIn/> 
          :
          (
          <Switch>
            <Route path="/home">
                <Home/> 
            </Route>
            <Route path="/profile">
              <ProfilePage/>
            </Route>
            <Route path="/signIn">
              <GoogleSignIn/>
            </Route>
          </Switch>
        )
        }
        
        
      </Router>
    </div>
  );
}

export default App;
