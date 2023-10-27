/* eslint-disable react/prop-types */
import Message from "./Message";

export default function Messages({ messages }) {
    return (
        <div>
            <div>
                {messages && 
                messages.map((message) => {
                    return <Message key={message._id} message={message} />;
                })}
            </div>
        </div>
    )
}