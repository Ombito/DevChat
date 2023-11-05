import React, { useEffect, useState, useRef } from 'react';
import './Inbox.css';
import Navbar from "./Navbar";

const Inbox = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageHistory, setMessageHistory] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const yourUserID = 1; // Replace 1 with the current user's ID

  // Fetch all items (initial list of messages)
  useEffect(() => {
    const apiUrl = 'http://127.0.0.1:5555/messages';
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setMessages(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  // Fetch message history when a user is selected
  useEffect(() => {
    if (selectedUser) {
      const apiUrl = `http://127.0.0.1:5555/messages/${selectedUser}`;
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (Array.isArray(data)) {
            setMessageHistory((prevMessageHistory) => ({
              ...prevMessageHistory,
              [selectedUser]: data,
            }));
          } else {
            setMessageHistory((prevMessageHistory) => ({
              ...prevMessageHistory,
              [selectedUser]: [],
            }));
          }
        })
        .catch((error) => {
          console.error('Error fetching message history:', error);
          setMessageHistory((prevMessageHistory) => ({
            ...prevMessageHistory,
            [selectedUser]: [],
          }));
        });
    }
  }, [selectedUser]);

  const handleUserClick = (userId) => {
    setSelectedUser(userId);
  };

   // Fetch messages from the server at regular intervals
   useEffect(() => {
    const intervalId = setInterval(() => {
      const apiUrl = 'http://127.0.0.1:5555/messages';
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setMessages(data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, 5000); 

    return () => clearInterval(intervalId);
  }, []);

  const messageHistoryRef = useRef(null);

// Scroll to the bottom of the message history when a new message is added
useEffect(() => {
  if (messageHistoryRef.current) {
    messageHistoryRef.current.scrollTop = messageHistoryRef.current.scrollHeight;
  }
}, [messageHistory]);

  const handlePostMessage = () => {
    if (newMessage.trim() !== '') {
      // Define the message object to send to the server
      const messageData = {
        sender_id: yourUserID,
        receiver_id: selectedUser,
        text: newMessage,
        created_at: new Date().toISOString(),
      };

      // Send a POST request to your server to add the new message
      fetch('http://127.0.0.1:5555/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          // Add the new message to the message history
          setMessageHistory([...messageHistory, data]);
          setNewMessage('');
          if (messageHistoryRef.current) {
          messageHistoryRef.current.scrollTop = messageHistoryRef.current.scrollHeight;
          }
        })
        .catch((error) => {
          console.error('Error posting message:', error);
        });
    }
  };

  return (
    <>
      <Navbar />
      <div id="inbox-body">
        <div className='user-item'>
          <div className='username-hero'>
            <h2 id="messages">MESSAGES</h2>
            <div className='message-div'>
              {loading ? (
                <p>Loading...</p>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => handleUserClick(message.sender_id)}
                    className='message-clickable'
                  >
                    <div className='username-group'>
                      <p className='username-text'>{message.sender_username}</p>
                      <p className='message-date'>{message.created_at}</p>
                    </div>
                    <p>{message.text}</p>
                  </div>
                ))
              )}
            </div>
          </div>
          {selectedUser && (
      <div className="message-history" ref={messageHistoryRef}>
        <h3>{selectedUser}</h3>
        <div className="message-list">
          {messageHistory[selectedUser]?.map((message) => (
            
            <div
              key={message.id}
              className={`message ${message.sender_id === yourUserID ? 'sent' : 'received'}`}
            >
              <p>{message.text}</p>
              <p className="timestamp">{message.created_at}</p>
            </div>
          ))}
        </div>
        <div className="message-textbox">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={handlePostMessage}>Send</button>
        </div>
    </div>
    )}
        </div>
      </div>
    </>
  );
};

export default Inbox;





// import React, { useEffect, useState } from 'react';
// import './Inbox.css';
// import Navbar from "./Navbar";


// // import React, { useState, useEffect } from 'react';

// const Inbox = () => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [messageHistory, setMessageHistory] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [sender_id, setSenderID] = useState(null);

//   // Fetch all items (initial list of messages)
//   useEffect(() => {
//     const apiUrl = 'http://127.0.0.1:5555/messages';

//     fetch(apiUrl)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`Network response was not ok: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log(data);
//         if (data && data.user_id) {
//           setSenderID(data.user_id);
//         }
//         if (data && data.messages) {
//           setMessages(data.messages);
//         }
//         setLoading(false);
//       })
//       // .then((data) => {
//       //   setMessages(data);
//       //   setLoading(false);
//       //   setSenderID(data.user_id);
//       // })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       });
//   }, []);

//   // Fetch message history when a user is selected
//   useEffect(() => {
//     if (selectedUser) {
//       const apiUrl = `http://127.0.0.1:5555/messages/${selectedUser}`;
  
//       fetch(apiUrl)
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error(`Network response was not ok: ${response.status}`);
//           }
//           return response.json();
//         })
//         .then((data) => {
//           if (Array.isArray(data)) {
//             setMessageHistory(data);
//           } else {
//             setMessageHistory([]); 
//           }
//         })
//         .catch((error) => {
//           console.error('Error fetching message history:', error);
//           setMessageHistory([]); 
//         });
//     }
//   }, [selectedUser]);
  
//   // useEffect(() => {
//   //   if (selectedUser) {
//   //     const apiUrl = `http://127.0.0.1:5555/messages/${selectedUser}`;

//   //     fetch(apiUrl)
//   //       .then((response) => {
//   //         if (!response.ok) {
//   //           throw new Error(`Network response was not ok: ${response.status}`);
//   //         }
//   //         return response.json();
//   //       })
//   //       .then((data) => {
//   //         setMessageHistory(data);
//   //       })
//   //       .catch((error) => {
//   //         console.error('Error fetching message history:', error);
//   //       });
//   //   }
//   // }, [selectedUser]);

//   const handleUserClick = (userId) => {
//     setSelectedUser(userId);
//   };

//   const handlePostMessage = () => {
//   if (newMessage.trim() !== '') {
//     // Define the message object to send to the server
//     const messageData = {
//       sender_id: yourUserID, // Your user's ID
//       receiver_id: selectedUser, // Receiver's user ID
//       text: newMessage,
//       created_at: new Date().toISOString(), // You can create a timestamp on the client side
//     };

//     // Send a POST request to your server to add the new message
//     fetch('http://127.0.0.1:5555/messages', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(messageData),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`Network response was not ok: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         // Add the new message to the message history
//         setMessageHistory([...messageHistory, data]);
//         setNewMessage(''); // Clear the message input
//       })
//       .catch((error) => {
//         console.error('Error posting message:', error);
//       });
//   }
// };

  

//   return (
//     <>
//       <Navbar />
//       <div id="inbox-body">     
//       <div className='user-item'>
//         <div className='username-hero'>
//           <h2 id="messages">MESSAGES</h2>
//           <div className='message-div'>
            
//             {loading ? (
//               <p>Loading...</p>
//             ) : (
//               messages.map((message) => (
//                 <div
//                   key={message.id}
//                   onClick={() => handleUserClick(message.sender_id)}
//                   className='message-clickable'
//                 >
//                   <div className='username-group'>                  
//                     <p className='username-text'>{message.sender_username}</p>
//                     {/* <p className='message-date'>{message.created_at}</p> */}
//                   </div>
//                   <p>{message.text}</p>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>
//           {selectedUser && (
//             <div className="message-history">
//               <h3>Message History with User ID {selectedUser}</h3>
//               <ul>
//                 {messageHistory.map((message) => (
//                   <li key={message.id}>
//                     <p>{message.text}</p>
//                     <p>Created at: {new Date(message.created_at).toLocaleString()}{message.created_at}</p>
//                   </li>
//                 ))}
//               </ul>
//               <div className='message-textbox'>
//                 <textarea
//                   value={newMessage}
//                   onChange={(e) => setNewMessage(e.target.value)}
//                   placeholder="Type your message..."
//                 />
//                 <button onClick={handlePostMessage}>Send</button>
//               </div>
//             </div>
//           )}
//         </div>
//     </div>
//     </>
//   );
// };

// export default Inbox;







// const Inbox = () => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const apiUrl = 'http://127.0.0.1:5555/messages';

//     fetch(apiUrl)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`Network response was not ok: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setMessages(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       });
//   }, []); 

//   return (
//     <div id="inbox-body">
//       <h2>Message List</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className='message-div' onClick={handleMessageDivClick}>
//           {messages.map((message) => (
//             <div key={message.id}>
//               <div className='username-group'>
//                 <p className='username-text'>{message.sender_username}</p>
//                 <p className='message-date'>{message.created_at}</p>
//               </div>
//               <p>{message.text}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Inbox;




// function InboxList() {
//   // const [users, setUsers] = useState([]);
//   // const [newMessage, setNewMessage] = useState('');
//   const [messages, setMessages] = useState([]);



//   useEffect(() => {
//     const fetchData = () => {
//       fetch('http://127.0.0.1:5555/messages')
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error('Network response was not ok');
//           }
//           return response.json();
//         })
//         .then((data) => {
//           if (data.messages && Array.isArray(data.messages)) {
//             setMessages(data.messages);
//           } else {
//             throw new Error('Data is not in the expected format.');
//           }
//         })
//         .catch((error) => console.error('Error fetching data:', error));
//     };

//     fetchData();
//   }, []);

//   // const handleMessageSubmit = (e) => {
//   //   e.preventDefault();
//   //   fetch('http://localhost:5555/messages', {
//   //     method: 'POST',
//   //     headers: {
//   //       'Content-Type': 'application/json',
//   //     },
//   //     body: JSON.stringify({ text: newMessage }),
//   //   })
//   //     .then((response) => response.json())
//   //     .then((data) => setMessages([...messages, data]));
//   // };



//   return (
//     <div>
//       <Navbar/>
//       {messages.map((message) => (
//         <div key={message.id} className="user-item">
//           <div className='user-group'>
//             <p>{message.sender_id}</p>
//             <p>{message.text}</p>
//           </div>
//           <div className="user-details">
//             <h3>{message.created_at}</h3>
//             <h5>{message.receiver_id}</h5>
//           </div>
//           {/* <form onSubmit={handleMessageSubmit}>
//             <input
//               type="text"
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//             />
//             <button type="submit">Send</button>
//           </form> */}

//         </div>
//       ))}
//     </div>
//   );
// }

// const Inbox = () => {
//   return (
//     <div className='inbox-container'>
//         <h1>Inbox</h1>
//       <div className='inbox-header'>
//         <input type="text" placeholder="Search messages" />
//         <h4>New Message</h4>
//       </div>
//       <renderUserList />
//       <InboxList />
//     </div>
//   );
// }

// export default Inbox;






// import React, { useState } from 'react';


// const Inbox = () => {
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [newMessage, setNewMessage] = useState('');

//   const handleUserClick = (userIndex) => {
//     setSelectedUser(userIndex);
//     setNewMessage(''); // Clear the input field when switching users
//   };

//   const handleSendMessage = () => {
//     // Update the selected user's messages with the new message
//     // inboxModel[selectedUser].messages.push({ text: newMessage, sentByUser: true });
//     setNewMessage('');
//   };

//   return (
//     <div>
//       <div className="user-list">
//         {/* {inboxModel.map((user, index) => (
//           <div key={index} onClick={() => handleUserClick(index)}>
//             {user.username}
//           </div>
//         ))} */}
//       </div>
//       <div className="message-container">
//         {selectedUser !== null && (
//           <div>
//             <div className="message-history">
//               {/* {inboxModel[selectedUser].messages.map((message, index) => (
//                 <div key={index} className={message.sentByUser ? 'sent' : 'received'}>
//                   {message.text}
//                 </div>
//               ))} */}
//             </div>
//             <div className="message-input">
//               <input
//                 type="text"
//                 placeholder="Type a message"
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//               />
//               <button onClick={handleSendMessage}>Send</button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Inbox;



























































































































// import React, { useState, useEffect } from 'react';

// function Inbox({ users }) {
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [messages, setMessages] = useState({});

//   const handleUserClick = (user) => {
//     // Load the messages for the selected user from your backend or state
//     // You may use an API call or fetch the data from your database
//     // Update the messages state with the selected user's messages
//     // Example: setMessages({ ...messages, [user.id]: user.messages });
//     setSelectedUser(user);
//   };

//   const handleSendMessage = (message) => {
//     // Send the message to the selected user (selectedUser)
//     // Update the state with the new message
//     // Example: setMessages({ ...messages, [selectedUser.id]: [...messages[selectedUser.id] || [], message] });
//   };

//   useEffect(() => {
//     // You can use this effect to load initial data when the component mounts
//     // Example: loadInitialData();
//   }, []);

//   const renderUserList = () => {
//     // Map through the list of users and create user items
//     return users.map((user) => (
//       <div
//         key={user.id}
//         className="user-item"
//         onClick={() => handleUserClick(user)}
//       >
//         <img src={user.profilePicture} alt={user.username} />
//         <div className="user-details">
//           <h3>{user.username}</h3>
//           <p>Last Message: {user.lastMessage}</p>
//         </div>
//       </div>
//     ));
//   };

//   const renderMessageDisplay = () => {
//     // Render the selected user's messages
//     if (selectedUser) {
//       const userMessages = messages[selectedUser.id];

//       return (
//         <div className="message-display">
//           <h2>{selectedUser.username}</h2>
//           {userMessages && userMessages.map((message, index) => (
//             <div key={index} className="message">
//               <p>{message}</p>
//             </div>
//           ))}
//           <div className="message-input">
//             {/* Input field and button to send messages */}
//             <input type="text" placeholder="Type your message..." />
//             <button onClick={handleSendMessage}>Send</button>
//           </div>
//         </div>
//       );
//     }

//     return <div className="no-user-selected">Select a user to view messages.</div>;
//   };

//   return (
//     <div className="inbox-container">
//       <div className="user-list">
//         {renderUserList()}
//       </div>
//       {renderMessageDisplay()}
//     </div>
//   );
// }

// export default Inbox;
