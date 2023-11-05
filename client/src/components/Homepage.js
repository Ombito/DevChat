
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaThumbsUp, FaComment } from 'react-icons/fa';
import Navbar from './Navbar';
import './Homepage.css';

function Homepage({ post }) {
  const navigate = useNavigate();
  const [getPosts, setPosts] = useState([]);
  const [likes, setLikes] = useState(post?.likes || 0);
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

    fetch('http://127.0.0.1:5555/topics')
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.topic)) {
          setTopics(data.topic);
          

        } else {
          console.error('Data is not in the expected format:', data);
        }
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
        <form submit={{ addNewPost }}>
        <textarea
          placeholder="Write a post"
          value={newPost.message}
          onChange={(e) => setNewPost({ ...newPost, message: e.target.value })}
        />
<<<<<<< HEAD
        <div className='img-div'>
          <input placeholder="Enter image URL" className='img-post'/>
          <button onClick={addNewPost}>Post</button>
        </div>
=======
        <button type='submit' >Post</button>
        </form>
>>>>>>> d606b7640f36f6f696490befce1b65c65994c429
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
                <button onClick={handleLike}><FaThumbsUp /> Like ({likes})</button>
                <button onClick={() => handleCommentClick(post.id)}><FaComment /> Comment</button>
                <div className="timestamp">{new Date().toLocaleString()}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="topics">
        <h1 className="cin">Topics</h1>
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