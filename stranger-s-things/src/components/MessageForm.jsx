/* eslint-disable react/prop-types */
import { APIURL } from "../API/api";
import { useState } from "react";
import Messages from "./Messages";

export default function MessageForm({ post, token }) {
    const [message, setMessage] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(message);
        const response = await postMessage();
        console.log(response);
        setMessage("");
    }

    const postMessage = async () => {
        try {
            const response = await fetch(`${APIURL}/posts/${post._id}/messages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    message: {
                        content: message,
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

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Message
                    <input className="widerinput" type="text" value={message} onChange={(e) => setMessage(e.target.value)}/>
                </label>
                <br />
                <button type="submit" id="post-message">Send Message</button>
                <br />
            </form>
            <Messages messages={post.messages} />
        </div>
    )
}
