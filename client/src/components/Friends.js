import React, { useState, useEffect } from 'react';

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

    return (
        <div className='friend'>
            <h2>My Friends</h2>
            <ul className="friends-list">
                {friends.map((friend) => (
                    <li key={friend.id} className="friend-item">
                        {friend.user}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Friends;
