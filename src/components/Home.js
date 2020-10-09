import React, { useEffect, useState } from 'react'
import Post from './Post';
import {db} from '../firebase';
import AddPost from './AddPost';

function Home(props) {
    
    const [posts, setPosts] = useState([]);
    const {user} = props;

    useEffect(()=>{
        db.collection('posts').onSnapshot(snapshot =>{
            setPosts(snapshot.docs.map( doc => doc.data()));
        });
    },[])

    return (
        <div className="home">
            <AddPost user={user}/>
            { posts && 
                posts.map(post => {
                    return <Post username={post.username} content={post.content} image={post.image}/>
                })
            }
        </div>
    )
}

export default Home
