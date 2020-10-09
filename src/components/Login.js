import React, {useState, useContext} from 'react'
import './Login.css'
import {auth} from './../firebase';
import AuthContext from './../App';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err,setError] = useState('');
    const Auth = useContext(AuthContext);

    const handleLogin = () =>{
        auth.signInWithEmailAndPassword(email,password)
        .then((res)=>{
            console.log("login",res);
            if (res.user) Auth.setIsLogged(true);
        })
        .catch((err)=>{
            console.log(err);
            switch(err.code){
                case "auth/invalid-email":
                    setError(err.message);
                    break;
                
                case "auth/user-not-found":
                    setError(err.message);
                    break;

                case "auth/wrong-password":
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
                <h2>Login</h2>
            </div>
            <div className="login_body">
                {err && <div className="error"> * {err}</div>}
                <div className="login_field">
                    <input type="text" onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
                </div>
                <div className="login_field">
                    <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
                </div>
                <button onClick={()=>handleLogin()}> Login </button>
            </div>
        </div>
    );
}

export default Login
