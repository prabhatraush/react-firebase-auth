import React from 'react';
import './Header.css';
import {Link } from 'react-router-dom';
import {auth} from '../firebase';

function Header(props) {
    const {user} = props;

    const handleLogout = () =>{
        console.log("LoggedOut");
        auth.signOut();
    }

    if(user)
    console.log("header", user);

    return (
        <div className="header_container">
            <div className="header_logo">
                LoginSystem
            </div>
            {   user    ? 
                <div className="header_menu">
                    <div className="header_item">
                            <img src={user.profPic} alt={user.profPic}/>
                            {user.email}
                    </div>
                    <div className="header_item">
                        <Link to="/" onClick={()=>handleLogout()} >Logout</Link>
                    </div>
                </div>
                :
                <div className="header_menu">
                    <div className="header_item">
                        <Link to="/">Login</Link>
                    </div>
                    <div className="header_item">
                        <Link to="/signup" >Signup</Link>
                    </div>
                </div>
            }
           
        </div>
    )
}

export default Header
