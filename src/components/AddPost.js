import React, { useState } from 'react'
import './AddPost.css';
import {db} from '../firebase';

function AddPost(props) {

    const {user} = props;

    const [content, setCaption] = useState('');
    const [image, setPhoto]= useState('');

    const handleAddPost = ()=>{
        db.collection("post").add({
            content:content,
            image:image,
            date:new Date(),
            username:user.email})
        .then(docRef=>{
            console.log(docRef.id);
        }).catch(err=>{
            console.log(err);
        })
    }

    return (
        <div className="add_post">
            <div className="input_field">
                <textarea placeholder=" Whats on yours minds ? " onChange={(e)=>setCaption(e.target.value)}/>
            </div>
            <div className="input_field">
                <input type="file" placeholder="Upload" onChange={(e)=>setPhoto(e.target.files[0])}/>
            </div>
            <button onClick={()=>handleAddPost()}>Post</button>
        </div>
    )
}

export default AddPost
