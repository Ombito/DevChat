import React, { useState, useEffect } from 'react';
import { FaEnvelope } from 'react-icons/fa';

function Friends() {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
    
        fetch('http://localhost:3000/friends')
            .then((response) => response.json())
            .then((data) => {
                setFriends(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    
    function handleMessage(){
    };

    return (
        <div className='friend'>
            <h2>My Friends</h2>
            <ul className="friends-list">
                {friends.map((friend) => (
                    <li key={friend.id} className="friend-item">
                        <div className="frimg">
                        <img src={friend.image} alt={friend.name} className="inboximg" />
                        </div>
                        {friend.user}
                        <button onClick={handleMessage}><FaEnvelope /> Message</button>
                    </li>

                ))}
            </ul>
        </div>
    );
}

export default Friends;
