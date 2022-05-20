import { useState, useEffect } from "react";

import io from "socket.io-client";

let socket;

export default function Chat() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (!socket) {
            socket = io.connect();
        }
        console.log("SOCKET IS CONNECTED ✅");
        socket.on("recentMessages", (recentMessages) => {
            setMessages([...recentMessages]);
        });

        return () => {
            // unsubscribe from both events via socket.off(eventName)
            socket.off("recentMessages");
            socket.off("newMessage");
            socket.disconnect();
            socket = null;
        };
    }, []);

    useEffect(() => {
        // listen to the new message event, update the state accordingly
        socket.on("newMessage", (newMessage) => {
            setMessages(...messages, newMessage);
            console.log("ALL MESSAGES 📥", messages, newMessage);
        });
    }, [messages]);

    function onSubmit(event) {
        event.preventDefault();
        const text = event.target.text.value;
        socket.emit("sendMessage", text);
        event.target.text.value = "";
    }

    return (
        <div className="chat-container">
            <h1> This is the Groupchat!</h1>
            {messages &&
                messages.map((message) => {
                    return (
                        <div key={message.id}>
                            <p>
                                {message.firstname} says: {message.text}
                            </p>
                        </div>
                    );
                })}
            <form onSubmit={onSubmit}>
                <input name="text"></input>
                <button>Submit</button>
            </form>
        </div>
    );
}
