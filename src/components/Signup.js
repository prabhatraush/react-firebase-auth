import React, {useState} from 'react'
import './Login.css'
import {auth, storage} from './../firebase'

function Signup() {
    const [displayName, setName] = useState('');
    const [photoURL, setProfilePic] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err,setError] = useState(null);


    const handleSignUp = () =>{
        auth.createUserWithEmailAndPassword(email,password)
        .then((res)=>{
            storage.ref('users/'+res.user.uid+'/profile.jpg').put(photoURL)
            .then(()=>{
                console.log("profile pic uploaded");
            })
            console.log("Signup",res.user);
        })
        .catch((err)=>{
            console.log(err);
            switch(err.code){
                case "auth/email-already-in-use":
                    setError(err.message);
                    break;
                
                case "auth/invalid-email":
                    setError(err.message);
                    break;

                case "auth/weak-password":
                    setError(err.message);
                    break;

                default:
                    break;
            
            }
        });
    }

    return (
        <div className="login_container">
            <div className="login_header">
                <h2>Sign Up</h2>
            </div>
            <div className="login_body">
                {err && <div className="error"> * {err}</div>}
                <div className="login_field">
                    <input type="text" onChange={(e)=>setName(e.target.value)} placeholder="Name" />
                </div>
                <div className="login_field">
                    <input type="text" onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
                </div>
                <div className="login_field">
                    <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
                </div>
                <div className="login_field">
                    <input type="file" onChange={(e)=>setProfilePic(e.target.files[0])} placeholder="Profile Picture" />
                </div>
                <button onClick={()=>handleSignUp()}> Sign Up </button>
            </div>
        </div>
    );
}

export default Signup
