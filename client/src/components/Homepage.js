import React ,{ useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import Navbar from "./components/Navbar";
import Navbar from './Navbar'

function Homepage() {
    const navigate = useNavigate();
    const [getPosts, setPosts] = useState([]);
    useEffect(() => {
        fetch("db.json")
            .then((response) => response.json())
            .then((data) => setPosts(data));
    }, []);

    const [search, setSearch] = useState('')

   
    const handleCommentClick = (postId) => {
        navigate(`/comments/${postId}`);
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

    return (
        <div>
            <Navbar />
            <div>
                <form className="search">
                    <input type="text" placeholder="search..." value={search} onChange={handleChange} />
                </form>
            </div>
            <div className='post'>
            {filtered.map((post) => (
                <div key={post.id}>
                    <img src={post.img} alt={post.name} />
                    <p1>message: {post.message}</p1>
                    <h4>location: {post.location}</h4>
                    <h4>timestamp: {post.timestamp}</h4>
                    <h4>likes: {post.likes}</h4>
                    <h4>timestamp: {post.comments}</h4>
                    
                    <button onClick={() => handleCommentClick(post.id)}>Comment</button>
                    
                </div>
            ))}
            </div>
            <div className="inbox">
                <h1 className="chattxt">Inbox</h1>
                <h1 className="chattxt">Trends</h1>
                <h1 className="chattxt">Notifications</h1>
                
            </div>
        </div>
    );
}

export default Homepage;