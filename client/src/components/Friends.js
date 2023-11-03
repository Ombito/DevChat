import React from "react";


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
        <div >

        </div>
    );
}

export default Friends;
