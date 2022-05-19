import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { receiveFriendsAndWannabes } from "./friends-and-wannabes/slice.js";
import { unfriend } from "./friends-and-wannabes/slice.js";
import { Link } from "react-router-dom";

export default function Friends() {
    const dispatch = useDispatch();

    const friends = useSelector((state) => {
        return state.friendsAndWannabes.filter(({ accepted }) => accepted);
    });

    console.log("friends", friends);
    const wannabes = useSelector((state) => {
        return state.friendsAndWannabes.filter(({ accepted }) => !accepted);
    });

    console.log("wannabes", wannabes);

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

    function handleClick() {
        console.log("CLICED");
    }
    // async function handleEnd(id) {
    //     console.log("clicked END to:", id);
    //     // const res = await fetch(`/friendship/unfriended/${id}`, {
    //     //     method: "POST",
    //     //     body: JSON.stringify({
    //     //         recipient_id: id,
    //     //         status: "UNFRIEND",
    //     //     }),
    //     // });
    //     // const response = await res.json();
    //     // console.log("response: ", response);

    //     // let action = unfriend(id);
    //     // dispatch(action);
    // }

    return (
        <>
            {friends.length >= 1 ? (
                friends.map((friend) => {
                    return (
                        <div className="FriendsContainer" key={friend.id}>
                            <Link to={`/user/${friend.id}`}>
                                <img src={friend.profile_picture_url} />
                            </Link>
                            <br />
                            {friend.first} {friend.last}
                            <button
                                onClick={() => console.log("LOGLOGLOG")}
                                className="friend-button"
                            >
                                End Friendship!
                            </button>
                        </div>
                    );
                })
            ) : (
                <h1>No friends</h1>
            )}

            <button onClick={handleClick} className="friend-button">
                End Friendship!
            </button>
        </>
    );
}
