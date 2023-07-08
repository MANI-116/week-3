
import React from "react";

/// This is the landing page. You need to add a link to the login page here.
/// Maybe also check from the backend if the user is already logged in and then show them a logout button
/// Logging a user out is as simple as deleting the token from the local storage.


function Landing() {
    const [loginStatus,setLoginStatus] = React.useState(localStorage.getItem('token'));
    console.log(loginStatus)

    function handleLogOutClick(){

           localStorage.removeItem('token');
           setLoginStatus(null);
    }
    
   
    return <div>
        <h1>Welcome to course selling website!</h1>
        <a href="/register">Register</a>
        <br/>
        {loginStatus === null ? <a href="/login">Login</a> : <button onClick={handleLogOutClick}>logout</button> }
        
    </div>
}

export default Landing;