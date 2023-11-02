import React ,{ useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Homepage() {
    const navigate = useNavigate();
    const [getPosts, setPosts] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/posts")
            .then((response) => response.json())
            .then((data) => setPosts(data));
    }, []);

    const [search, setSearch] = useState('')

   
    const handleCommentClick = (postId) => {
        navigate(`/post/${postId}`);
    }
    function handleChange(e) {
        setSearch(e.target.value)
    }
    const filtered = getPosts.filter((i) => {
        if (search === '') {
            return true
        } else {
            return i.name.includes(search)
        }
    })
    const [users, setUsers] = useState([]);

    useEffect(() => {

        fetch('http://localhost:3000/messages')
            .then((response) => response.json())
            .then((data) => setUsers(data))
    }, []);

    return (     
        <div className="main">
            <form className="search">
                <input type="text" placeholder="search..." value={search} onChange={handleChange} />
            </form>
            
            <div className='post'>
                {filtered.map((post) => (
                <div key={post.id}>
                    <div className='post2'>
                    <img src={post.userpic} alt={post.name} className="postpic" />
                    <h4> {post.user}</h4>
                    </div>
                    <img src={post.image} alt={post.name} className="post img"/>
                    <div className="ptext">
                    <p1> {post.message}</p1>
                    <h4>{post.timestamp}</h4>
                    <h4> {post.likes}</h4>
                    <div className="timestamp">{new Date().toLocaleString()}</div>
                    
                    <button onClick={() => handleCommentClick(post.id)}>Comment</button>
                    </div>
                </div>
            ))}
            </div>
            <div className="inbox">
                <h1 className="cin">Chat</h1>
                <ul>
                    {users.map((user, index) => (
                        <li key={index} className="user-entry">
                            <div className="username">{`${user.username}`}</div>
                            <div className="message">{user.message}</div>
                            <div className="timestamp">{new Date().toLocaleString()}</div>
                        </li>
                    ))}
                </ul>
                
            </div>
        </div>
    );
}

export default Homepage;