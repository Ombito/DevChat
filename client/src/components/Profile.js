import React, { useState, useEffect } from "react";


function Profile ({ userId }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userSession = sessionStorage.getItem('userSession'); 

        if (userSession) {
            fetch('/api/user', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${userSession}`                 }
            })
                .then((response) => response.json())
                .then((data) => {
                    setUser(data);
                })
                .catch((error) => console.error(error));
        }
    }, []);
    return (
        <div>
        <div className="profile">
            {user ? (
                <>
                <div className="profile-picture">
                    <img src={user.profile_picture} alt="Profile" />
                </div>
                <div className="user-info">
                    <h1 className="username">{user.username}</h1>
                    <p className="full-name">{user.full_name}</p>
                    <p className="age">{`Age: ${user.age}`}</p>
                    <p className="dob">{`Gender: ${user.gender}`}</p>
                    <p className="bio">{user.bio}</p>
                </div>
                <button className="edit-profile-button">Edit Profile</button>
            </>
        ) : (
            <p>User not found</p>
        )}
    </div>
    </div>
    );
};


export default Profile;