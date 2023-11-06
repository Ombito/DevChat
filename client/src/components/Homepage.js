
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaComment, FaThumbsUp } from 'react-icons/fa';
import Navbar from './Navbar';
import './Homepage.css';

function Homepage({ post,initialLikes, userId, postId } ) {
  const navigate = useNavigate();
  const [getPosts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ user: '', message: '' });
  const [search, setSearch] = useState('');
  const [topics, setTopics] = useState([]);
  


  useEffect(() => {
    fetch('http://127.0.0.1:5555/posts')
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.posts)) {
          setPosts(data.posts);
        } else {
          console.error('Data is not in the expected format:', data);
        }
      });
  }, []);

  useEffect(() => {
    fetch('http://127.0.0.1:5555/topics')
      .then(response => response.json())
      .then(data => {
        setTopics(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);


  function addNewPost() {
      fetch("http://127.0.0.1:5555/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      })
        .then((response) => response.json())
        .then((data) => setPosts(data));
      
      
  }


  function handleCommentClick(postId) {
    navigate(`/post/${postId}`);
  }

  
  const [likes, setLikes] = useState(initialLikes);
  const [clicked, setClicked] = useState(false);

    const handleLikeClick = () => {
      setLikes(likes + 1);
      setClicked(true);
    };

    useEffect(() => {
      if (clicked) {
        fetch('http://127.0.0.1:5555/likes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_id: userId,
            post_id: postId
          })
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setLikes(data.likes); 
          })
          .catch(error => console.error(error));
      }
    }, [clicked, userId, postId]);

  

  const filtered = getPosts.filter((post) => {
    const cleanMessage = post.message.trim().toLowerCase(); 
    const cleanSearch = search.trim().toLowerCase(); 

    if (cleanSearch === '') {
      return true;
    } else {
      return cleanMessage.includes(cleanSearch);
    }
  });
  function handleChange(e) {
    setSearch(e.target.value);
  }


  return (
    <div className="main">
      <Navbar />
      <form className="search">
        <input type="text" placeholder="Search posts" value={search} onChange={handleChange} />
      </form>
      <div className="createpost">
        <form submit={{ addNewPost }}>
        <textarea
          placeholder="Write a post"
          value={newPost.message}
          onChange={(e) => setNewPost({ ...newPost, message: e.target.value })}
        />
        <button type='submit' >Post</button>
        </form>
      </div>
      <div className="post">
        {filtered.map((post) => (
          <div key={post.id} className="user-item">
            <div className="user-group">
              <img src={post.user_pic} alt="Profile" className="post2" />
            </div>
            <div className="post-group">
              <p1> {post.message}</p1>
              <div className="postimg">
                <img src={post.image} alt={post.name} />
              </div>
              <div className="ptext">
                <h4>{post.timestamp}</h4>
                <button onClick={handleLikeClick}>
                  {likes} Likes
                </button>
                <button onClick={() => handleCommentClick(post.id)}><FaComment /> Comment</button>
                <div className="timestamp">{new Date().toLocaleString()}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="topics">
        <h1 className="cin">Topics</h1>
        <h1 className="">Python ,Django</h1>
        <h2>Python Django Developers expo</h2>
        <h1 className="">Reaxt JS</h1>
        <h2>The new package is here</h2>
        <h1 className="">Ruby</h1>
        <h2>The Rails question???</h2>
        <h1 className="">FOTRAN</h1>
        <h2>FOTRAN expo</h2>
        <ul>
          {topics.map((topic) => ( 
            <li key={topic.id}>
              {topic.title}<br />
              {topic.topic_text}<br />
              {topic.created_at}<br />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


export default Homepage;