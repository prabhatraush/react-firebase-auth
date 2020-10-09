import React, { useState, useEffect } from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Post from './components/Post';
import Signup from './components/Signup';
import {auth, storage} from './firebase';



export const AuthContext = React.createContext(null);
const  App = () => {

  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      if(user){
        storage.ref('users/'+user.uid+'/profile.jpg').getDownloadURL()
        .then(res=>{
          user.providerData[0].profPic = res;
          setUser(user.providerData[0]);
        })
      
      }
      else{
        setUser('');
      }
    });

  },[]);

  console.log("users",user);
  // console.log("login",isLogged);

  return (
    <AuthContext.Provider value={isLogged, setIsLogged}>
    <div className="App">
      <Header user={user}/>
      { user ?
        <Home user={user}/> : 
        <div>
          <Route exact path="/" component={Login}/>
          <Route path="/signup" component={Signup}/>
        </div>

      } 
      
     
    </div>
    </AuthContext.Provider>
  );
}

export default App;
