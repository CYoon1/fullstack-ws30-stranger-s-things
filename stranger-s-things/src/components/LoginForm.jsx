/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { APIURL } from "../API/api";

export default function LoginForm({ token, setToken, username, setUsername }) {
    const [password, setPassword] = useState("");

    const login = async () => {
        try {
            const response = await fetch(`${APIURL}/users/login`, {
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
        console.log(username);
        if (username.length < 6 || password.length < 6) {
            alert("Username & Password must be at least 6 characters");
            return;
        }
        const result = await login();

        if (result.success) {
            setToken(result.data.token);
            alert("Successful Login");
        } else {
            alert(`Failed to Log In: ${result.error.message}`);
        }

        console.log("Form Submitted");
    }

    return (
        <>
            <h1>{token ? "" : "Log In"}</h1>

            <div id="logoutcontainer">
                {token ? (
                    <button id="logout" onClick={() => {
                        setToken("");
                        setUsername("");
                        setPassword("");
                    }}
                    >
                    Logout
                    </button>
                ) : (
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label className="label-login">
                                Username
                                <input 
                                    type="username" 
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)} 
                                />
                            </label>
                        </div>
                        <div className="input-group">
                            <label className="label-login">
                                Password
                                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </label>
                        </div>
                        <button type="submit" id="login-button">
                            Login
                        </button>
                    </form>
                )
            }
            </div>
        </>
    )
}