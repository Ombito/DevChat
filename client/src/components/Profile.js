import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch("http://127.0.0.1:5555/users")
            .then(response => response.json())
            .then(data => {
                
                if (data.users.length > 0) {
                    setUser(data.users[0]);
                }
            });
    }, []);

    return (
        <>
            <Navbar />
            <div className="profile-container">
                <div className="profile-card">
                    {user && (
                        <>
                            <img src={user.profile_picture} alt="Profile Picture" className="profile-picture" />
                            <div className="profile-details">
                                <h2> {user.full_name}</h2>
                                <h2>{user.username}</h2>
                                <p>Age: {user.age}</p>
                                <p>Gender: {user.gender}</p>
                                <p>Bio: {user.bio}</p>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default Profile;

