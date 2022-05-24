import ProfilePicture from "./profilePicture";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";

export default function PostWall({ userId, profile_picture_url }) {
    const [allPosts, setAllPosts] = useState([]);
    const [newPost, setNewPost] = useState([]);
    const { otherUserId } = useParams();
    console.log("PROFILE URL", profile_picture_url);

    //===================================================================
    useEffect(() => {
        console.log("USE EFFECT IN WALL POST");
        fetch(`/getAllPosts/${otherUserId || userId}`)
            .then((res) => res.json())
            .then((result) => {
                console.log("ALL POSTS", result);
                setAllPosts(result);
            });
    }, [newPost, userId, otherUserId]);
    // FETCH FROM  "/getAllPosts/:userId"
    //===================================================================

    function postMessageOnWall(e) {
        e.preventDefault();
        const newPost = e.target.post.value;

        fetch(`/createWallPosts/${otherUserId || userId}`, {
            method: "POST",
            // WHAT COME ITO THE CURLY BRACKETS below
            body: JSON.stringify({ newPost: newPost }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((newPost) => {
                console.log(("POSTS FROM FETCHED: ", newPost));
                setAllPosts([...allPosts, newPost]);
                setNewPost([newPost]);
            });
        e.target.post.value = "";
    }
    //===================================================================

    function formatDate(timestamp) {
        const date = new Date(timestamp);
        return `${date.toLocaleDateString()} @ ${date.toLocaleTimeString()}`;
    }
    // console.log("ALL POSTSafdsdfsdfsdfsd", allPosts);
    //===================================================================

    return (
        <>
            <h3>This is the Posting Wall</h3>

            <div className="wall-container">
                <div className="posting-module">
                    <div className="paddingdiv">
                        <ProfilePicture
                            profile_picture_url={profile_picture_url}
                        />
                    </div>
                    <form onSubmit={postMessageOnWall}>
                        <input
                            placeholder="   ... create a wall post"
                            type="text"
                            name="post"
                        ></input>
                        <button>Post</button>
                    </form>
                </div>

                {allPosts.length > 0 && (
                    <div className="wallposts-module">
                        {allPosts.map((post) => {
                            return (
                                <>
                                    <div key={post.id} className="single-post">
                                        <img
                                            className="postImage"
                                            src={post.profile_picture_url}
                                        ></img>
                                        <h3>{post.firstname}: </h3>
                                        {post.text}
                                    </div>
                                    <time className="postTime">
                                        {formatDate(post.created_at)}
                                    </time>
                                </>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
}
