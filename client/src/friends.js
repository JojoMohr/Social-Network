import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { receiveFriendsAndWannabes } from "./redux/friends-and-wannabes/slice.js";
import { unfriend } from "./redux/friends-and-wannabes/slice.js";
import { accept } from "./redux/friends-and-wannabes/slice.js";
import { Link } from "react-router-dom";

export default function Friends() {
    const dispatch = useDispatch();

    const friends = useSelector((state) => {
        return state.friendsAndWannabes.filter(({ accepted }) => accepted);
    });

    // console.log("friends", friends);
    const wannabes = useSelector((state) => {
        return state.friendsAndWannabes.filter(({ accepted }) => !accepted);
    });

    // console.log("wannabes", wannabes);

    useEffect(() => {
        console.log("FETCHING DATA FROM /friends-and-wannabes");
        fetch("/friends-and-wannabes")
            .then((res) => res.json())
            .then((result) => {
                console.log("FRIENDS&WANNABEES 🔴", result);
                dispatch(receiveFriendsAndWannabes(result));
            })
            .catch((err) => {
                console.log("error in FETCH", err);
            });
    }, []);

    async function handleEnd(id) {
        console.log("clicked END to:", id);
        const res = await fetch("/set-friendship-status", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                recipient_id: id,
                status: "UNFRIEND",
            }),
        });
        const response = await res.json();
        console.log("response: ", response);

        let action = unfriend(id);
        dispatch(action);
    }

    async function handleAccept(id) {
        console.log(console.log("clicked ACCEPT to:", id));
        const res = await fetch("/set-friendship-status", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                recipient_id: id,
                status: "ACCEPT REQUEST",
            }),
        });
        const response = await res.json();
        console.log("response: ", response);

        let action = accept(id);
        dispatch(action);
    }

    return (
        <>
            <h3 className="yourfriends">Wannabe Friends </h3>

            <div className="RequestFriendsContainer">
                {wannabes.length >= 1 ? (
                    wannabes.map((users) => {
                        return (
                            <div className="singleUser" key={users.id}>
                                <Link to={`/user/${users.id}`}>
                                    <img src={users.profile_picture_url} />
                                </Link>
                                <br />
                                {users.firstname} {users.lastname}
                                <br />
                                <hr></hr>
                                <button
                                    onClick={() => handleAccept(users.id)}
                                    className="accept-button"
                                >
                                    Accept Friendship
                                </button>
                            </div>
                        );
                    })
                ) : (
                    <h1>No new requests</h1>
                )}
            </div>
            <h3 className="yourfriends">Your Friends </h3>
            <div className="RequestFriendsContainer">
                {friends.length >= 1 ? (
                    friends.map((friend) => {
                        return (
                            <div className="singleUser" key={friend.id}>
                                <Link to={`/user/${friend.id}`}>
                                    <img src={friend.profile_picture_url} />
                                </Link>
                                <br />
                                {friend.firstname} {friend.lastname}
                                <hr></hr>
                                <button
                                    onClick={() => handleEnd(friend.id)}
                                    className="friend-button"
                                >
                                    End Friendship
                                </button>
                            </div>
                        );
                    })
                ) : (
                    <h1>No friends</h1>
                )}
            </div>
        </>
    );
}
