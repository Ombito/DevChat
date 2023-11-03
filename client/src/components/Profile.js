import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";

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
        <div >
            
        </div>
    );
};


export default Profile;