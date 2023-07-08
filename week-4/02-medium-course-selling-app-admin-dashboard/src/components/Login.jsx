import React from "react";
import '../css/login.css'
/// File is incomplete. You need to add input boxes to take input for users to login.
function Login() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    function handleLoginClick() {
        fetch('http://localhost:3000/admin/login', {
            method: 'POST',
            headers: {
                'username': email,
                'password': password

            }
        }).then(resp => resp.json()).then((data) => {
            alert("response : " + data.message)
            console.log(data.token);
            localStorage.setItem('token', data.token)
            window.open('http://localhost:5173/about','_blank')
        })
    }

    return <div className="container-login">
        <h1 id="loginTitle">Login to admin dashboard</h1>
        <br />
        <label htmlFor="email">
            Email - <input type={"text"} id="email" onChange={e => setEmail(e.target.value)} />
        </label>
        <br />
        <label htmlFor="password">
            Password - <input type="password" id="password" onChange={e => setPassword(e.target.value)}></input>
        </label>
        <br />
        <button className="login-btn" onClick={handleLoginClick}>Login</button>
        <br />
        New here? <a href="/register">Register</a>
    </div>
}

export default Login;