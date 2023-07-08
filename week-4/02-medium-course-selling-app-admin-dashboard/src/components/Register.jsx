import React from "react";

/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("")

    function handleSignUpClick() {
        fetch('http://localhost:3000/admin/signup', {
            method: "POST",

            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    'username': email,
                    'password': password
                })

        }
        ).then(response => response.json()).then((data) => {
            console.log(data)
            alert("response : " + data.message)
            localStorage.setItem('token', JSON.stringify(data.token))
        })
    }

    return <div>
        <h1>Register to the website</h1>
        <br />
        <label htmlFor="email">
            Email:
            <input type="email" id="email" onChange={e => setEmail(e.target.value)} />
        </label>
        <br />
        <label htmlFor="password">
            Password:
            <input type="password" id="password" onChange={e => setPassword(e.target.value)} />
        </label>

        <button onClick={handleSignUpClick}>SignUp</button>

        <br />
        Already a user? <a href="/login">Login</a>
    </div>
}

export default Register;