import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

 function Friends(){
        const [friends, setfriends] = useState([]);

        useEffect(() => {
            
            fetch("http://127.0.0.1:5555/users")
                .then((response) => response.json())
                .then((data) => setfriends(data.users));
        }, []);

        return (
            <div>
                <Navbar />
                <h1>Friends</h1>
                <div className="friendlist1" >
                <ul>
                    {friends.map((user) => (
                        <li key={user.id} className="friend-request-item">
                            <div className='single'>
                            <img src={user.profile_picture}alt='pic'className="profile-picture"/>
                            <div className="username">{user.username}</div>
                            </div>
                        </li>
                    ))}
                </ul>
                </div>
            </div>
        );
    };
export default Friends;