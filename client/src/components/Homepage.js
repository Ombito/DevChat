
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaThumbsUp, FaComment, FaReply } from 'react-icons/fa';
import Navbar from './Navbar';
import './Homepage.css';

function Homepage({ post }) {
  const navigate = useNavigate();
  const [getPosts, setPosts] = useState([]); 
  const [likes, setLikes] = useState(post?.likes || 0);
  const [newPost, setNewPost] = useState({ user: '', message: '' });
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);


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

    fetch('http://127.0.0.1:5555/users')
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.users)) {
          setUsers(data.users);
        } else {
          console.error('Data is not in the expected format:', data);
        }
      });
  }, []);

  function addNewPost(){
    if (newPost.user && newPost.message) {
        fetch("http://localhost:5555/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPost),
        })
            .then((response) => response.json())
            .then((data) => {
                setPosts([...getPosts, data]);
                setNewPost({ user: "", message: "" });
                });
        }
    };

  function handleCommentClick(postId) {
    navigate(`/post/${postId}`);
  }

  function handleReply() {}

  function handleChange(e) {
    setSearch(e.target.value);
  }

  function handleLike() {
    setLikes(likes + 1);
  }

  const filtered = getPosts.filter((i) => {
    if (search === '') {
      return true;
    } else {
      
      return i.name && i.name.includes(search);
    }
  });

  return (
    <div className="main">
      <Navbar />
      {/* <form className="search">
        <input type="text" placeholder="Search posts" value={search} onChange={handleChange} />
      </form> */}
      <div className="createpost">
        <textarea
          placeholder="Write a post"
          value={newPost.message}
          onChange={(e) => setNewPost({ ...newPost, message: e.target.value })}
        />
        <div className='img-div'>
          <input placeholder="Enter image URL" className='img-post'/>
          <button onClick={addNewPost}>Post</button>
        </div>
      </div>

      <div className="post">
        {getPosts.map((post) => ( 
          <div key={post.id} className="user-item">
            <div className="user-group">
              <img src={post.user_pic} alt="Profile picture" className="post2" />
            </div>
            <div className="post-group">
                <p1> {post.message}</p1>
                <div className="postimg">
                    <img src={post.image} alt={post.name} />
                </div>
                <div className="ptext">
                    <h4>{post.timestamp}</h4>
                    <button onClick={handleLike}><FaThumbsUp /> Like ({likes})</button>
                    <button onClick={() => handleCommentClick(post.id)}><FaComment /> Comment</button>
                    <div className="timestamp">{new Date().toLocaleString()}</div>
                </div>
            </div>
          </div>
        ))}
      </div>

      <div className="inbox">
        <h1 className="cin">MESSAGES</h1>
        <ul style={{ listStyleType: 'none' }} className="inbox1">
          {users.map((user, index) => (
            <li key={index} className="user-entry">
              <div className="inboximg">
                <img src={user.image} alt={user.name} className="inboximg" />
              </div>
              <div className="username">{`${user.username}`}</div>
              <div className="message">{user.message}</div>
              <button onClick={handleReply}>
                <FaReply /> Reply
              </button>
              <div className="timestamp">{new Date().toLocaleString()}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Homepage;
