
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaComment, FaThumbsUp } from 'react-icons/fa';
import Navbar from './Navbar';
import './Homepage.css';

function Homepage({ post,  postId } ) {
  const navigate = useNavigate();
  const [getPosts, setPosts] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [newPost, setNewPost] = useState({ user: '', message: '' });
  const [search, setSearch] = useState('');
  const [topics, setTopics] = useState([]);
  
  const [userId, setUserId] = useState(generateRandomUserId());


  useEffect(() => {
    fetch('http://127.0.0.1:5555/posts')
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data.posts)) {
          setPosts(data.posts);
        } else {
          console.error('Data is not in the expected format:', data);
        }
      }, 2000);
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

  const handleLogin = (user) => {
   
    const loggedInUserId = user.id; 
    setUserId(loggedInUserId);
  };

  function generateRandomUserId() {
    return Math.floor(Math.random() * 100000); 
  }
  function addNewPost() {
    console.log("addNewPost function called");
    
    if (userId) {
      const postData = {
        message: newPost.message,
        image: newPost.image,
        userid: userId, 
      };

      fetch("http://127.0.0.1:5555/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(`Failed to create a new post: ${response.status}`);
        })
        .then((data) => {
          
          console.log("New post created:", data);
        })
        .catch((error) => {
          console.error("Error creating a new post:", error);
        });
    } else {
      
      console.log("User is not logged in. Please log in before posting.");
    }
  }
  
  


  function handleCommentClick() {  
  }

  
  // const [likes, setLikes] = useState(initialLikes);
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

  

  // const filtered = getPosts.filter((post) => {
  //   const cleanMessage = post.message.trim().toLowerCase(); 
  //   const cleanSearch = search.trim().toLowerCase(); 

  //   if (cleanSearch === '') {
  //     return true;
  //   } else {
  //     return cleanMessage.includes(cleanSearch);
  //   }
  // });
  function handleChange(e) {
    setSearch(e.target.value);
  }

  function handleLike() {
    setLikes(likes + 1);
    setIsLiked(true);
  }

  const filtered = getPosts.filter((i) => {
    if (search === '') {
      return true;
    } else {

      return i.name && i.name.includes(search);
    }
  });

  const likeButtonClass = isLiked ? 'liked' : 'not-liked';
  return (
    <div className="main">
      <Navbar />
      {/* <form className="search">
        <input type="text" placeholder="Search posts" value={search} onChange={handleChange} />
      </form> */}
      <div className="createpost">
        {/* <form submit={{ addNewPost }}> */}
        <textarea
          placeholder="Write a post"
          value={newPost.message}
          onChange={(e) => setNewPost({ ...newPost, message: e.target.value })}
        />
        <div className='img-div'>
          <input placeholder="Enter image URL" id='img-post' value={newPost.image_url} onChange={(e) => setNewPost({ ...newPost, image_url: e.target.value })}/>
          <button onClick={addNewPost}>Post</button>
        </div>
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
                <button onClick={handleLike} className={likeButtonClass}><FaThumbsUp /> ({likes}) Likes </button>
                <button onClick={() => handleCommentClick()} className="comments"><FaComment /> Comment</button>
                <div className="timestamp">{new Date().toLocaleString()}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="topics">
        <div className="groups">
          <h1>Top Groups</h1>
          <p className="">Python, Django Developers expo</p>
          <p>CodeGladiators</p>
          <p className="">Ruby101</p>
          <p>FOTRAN Expo</p>
          <p className="">Kenya JavaScript Developers</p>
          <p>Space ya Engineers</p>
          <p className="">Programming Memes</p>
          <p>DevDynamos</p>
          <p>HackMasters</p>
          <p>ProgramPioneers</p>
          <p>ByteBrigade</p>
        </div>
        <div className="groups">
          <h2>Trending Now</h2>
          {topics.map((topic) => ( 
            <p key={topic.id}>
              {topic.topic_text}<br />
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}


export default Homepage;