import { useState, useEffect, useRef } from "react";

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
            setMessages([...messages, newMessage]);
            // console.log("ALL MESSAGES 📥", messages, newMessage);
        });
    }, [messages]);

    function onSubmit(event) {
        event.preventDefault();
        const text = event.target.text.value;
        socket.emit("sendMessage", text);
        // console.log("🎃🎃🎃🎃", text);
        event.target.text.value = "";
    }

    return (
        <>
            <h1> This is the Groupchat!</h1>

            <div className="chat-container">
                {console.log("messages in chat: ", messages)}

                {messages &&
                    messages.map((message) => {
                        return (
                            <>
                                <div className="cirle1"></div>

                                <div
                                    className="single-message"
                                    key={message.id}
                                >
                                    <p className="sendername">
                                        {message.firstname}:
                                    </p>
                                    <p> {message.text}</p>
                                </div>
                            </>
                        );
                    })}
            </div>
            <form className="chat-input" onSubmit={onSubmit}>
                <input className="inputChat" name="text"></input>
                <button>Submit</button>
            </form>
        </>
    );
}

//iff message.sender_id != userId
