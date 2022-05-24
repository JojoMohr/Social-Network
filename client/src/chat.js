import { useState, useEffect, useRef } from "react";
// import "/style.css";

import io from "socket.io-client";

let socket;
// let user_Id;

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [user_Id, setUser_Id] = useState(null);
    const inputRef = useRef(null);
    const lastMessageRef = useRef(null);

    //================================================================

    useEffect(() => {
        if (!socket) {
            socket = io.connect();
        }
        console.log("SOCKET IS CONNECTED ✅");
        socket.on("recentMessages", (recentMessages, userId) => {
            setMessages([...recentMessages]);

            setUser_Id(userId);
            console.log("USER ID  ✅", user_Id); // 202
            return user_Id;
        });

        if (inputRef.current) {
            inputRef.current.focus();
        }
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView();
        }

        return () => {
            user_Id;
            // unsubscribe from both events via socket.off(eventName)
            socket.off("recentMessages");
            // socket.off("newMessage");
            socket.disconnect();
            socket = null;
        };
    }, []);

    //================================================================

    useEffect(() => {
        // listen to the new message event, update the state accordingly
        socket.on("newMessage", (newMessage) => {
            setMessages([...messages, newMessage]);

            // console.log("ALL MESSAGES 📥", messages, newMessage);
        });
        if (lastMessageRef.current) {
            console.log("WHATEVER ");
            lastMessageRef.current.scrollIntoView({
                behavior: "smooth",
            });
        }
        let userId = user_Id;

        console.log("THIS IS ID IN SECOND USEEFFECT ", userId);

        return () => {
            user_Id;
            socket.off("newMessage");
        };
    }, [messages]);

    //================================================================

    function onSubmit(event) {
        event.preventDefault();
        const text = event.target.text.value;
        socket.emit("sendMessage", text);
        // setMessages([...messages, { id: messages.length + 1, text }]);
        // console.log("🎃🎃🎃🎃", text);
        event.target.text.value = "";
        console.log("USER ID  ✅✅✅", user_Id); // 202
    }

    //================================================================
    function formatDate(timestamp) {
        const date = new Date(timestamp);
        return `${date.toLocaleDateString()} @ ${date.toLocaleTimeString()}`;
    }
    //================================================================

    return (
        <>
            <div className="chat">
                <h3 className="groupchat-heading">Groupchat!</h3>

                <div className="chat-container">
                    {messages &&
                        messages.map((message) => {
                            // return message.sender_id === user_Id ?
                            return (
                                <div
                                    className={
                                        message.sender_id === user_Id
                                            ? "message own-message"
                                            : "message other-message"
                                    }
                                    ref={lastMessageRef}
                                    key={message.id}
                                >
                                    <p className="sendername">
                                        {message.firstname}:
                                    </p>
                                    <p>{message.text}</p>

                                    <p className="dateStamp">
                                        {/* {message.created_at} */}
                                        <time>
                                            {formatDate(message.created_at)}
                                        </time>
                                    </p>
                                </div>
                            );
                        })}
                </div>
                <form className="chat-input" onSubmit={onSubmit}>
                    <input
                        autoComplete="off"
                        required
                        ref={inputRef}
                        className="inputChat"
                        name="text"
                    ></input>
                    <button>SEND</button>
                </form>
            </div>
        </>
    );
}

//iff message.sender_id != userId
