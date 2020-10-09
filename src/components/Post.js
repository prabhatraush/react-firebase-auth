import React from 'react';
import './Post.css';

function Post(props) {

    console.log(props);
    const {username, content, image} = props;

   

    return (
        <div className="post_container">
            <div className="post_header">
                <img src={image} alt={image}/>
                <h3>{username}</h3>
            </div>
            <div className="post_image">
                <img  src={image} alt={image}/>
            </div>
            <div className="post_content">
                <p><strong>{username}</strong> {content}</p>
            </div>
            
        </div>
    )
}

export default Post
