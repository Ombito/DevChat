import React, { useEffect, useState } from 'react';
import './Inbox.css';
import Navbar from "./Navbar";

function InboxList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch('http://127.0.0.1:5555/users')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          if (data.users && Array.isArray(data.users)) {
            setUsers(data.users);
          } else {
            throw new Error('Data is not in the expected format.');
          }
        })
        .catch((error) => console.error('Error fetching data:', error));
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      {users.map((user) => (
        <div key={user.id} className="user-item">
          <div className='user-group'>
            <img src='../Assets/logo.png' alt='Profile picture' />
            <p>{user.date}</p>
          </div>
          <div className="user-details">
            <h3>{user.username}</h3>
            <h5>{user.bio}</h5>
            <p>{user.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

const Inbox = () => {
  return (
    <div className='inbox-container'>
      <h1>Inbox</h1>
      <div className='inbox-header'>
        <input type="text" placeholder="Search messages" />
        <h4>New Message</h4>
      </div>
      <InboxList />
    </div>
  );
}

export default Inbox;