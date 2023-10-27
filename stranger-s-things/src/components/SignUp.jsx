/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { APIURL } from "../API/api";

export default function SignUp({ token, setToken }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const registerUser = async () => {
        try {
            const response = await fetch(`${APIURL}/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: {
                        username: username,
                        password: password,
                    },
                }),
            });
            const result = await response.json();
            console.log(result);
            return result;
        } catch (err) {
            console.error(err);
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setUsername(username.toLowerCase());
        if (username.length < 6 || password.length < 6) {
            alert("Username and Password must be at least 6 characters");
            return;
        }
        const result = await registerUser();
        if (result.success) {
            setToken(result.data.token);
            alert("Successful Registration " + `${result.data.message}`);
        } else {
            alert(`Failed to Register User ${result.error.message}`);
        }

        console.log("Form Submitted");
    }
    return (
        <>
        <h1 className="login-title">Sign Up</h1>

        <form className="form" onSubmit={handleSubmit}>
            <div className="input-group">
                <label>
                    Username
                    <input type="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
            </div>
            <div className="input-group">
                <label>
                    Password
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
            </div>
            <button type="submit" className="login-button">Sign Up</button>
        </form>
        </>
    );
}