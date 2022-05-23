import ProfilePicture from "./profilePicture";
import { useState, useEffect, useRef } from "react";

import io from "socket.io-client";

export default function PostWall() {
    const [posts, setPosts] = useState([]);

    return (
        <div className="wall-container">
            <h3>This is the Posting Wall</h3>
            <div className="posting-module">
                <ProfilePicture />
                <from>
                    <input></input>
                    <button>Post</button>
                </from>
            </div>
            <div className="wallposts-module"></div>
        </div>
    );
}
