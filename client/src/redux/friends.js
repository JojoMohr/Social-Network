import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { receiveFriendsAndWannabes } from "./friends-and-wannabes/slice.js";
import { unfriend } from "./friends-and-wannabes/slice.js";

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

    const unfriendClick = (e) => {
        console.log("CLICLCLCICLC", e.target.id);
        // dispatch(unfriend(result));
    };

    return (
        <>
            {friends &&
                friends.map((item) => {
                    return (
                        <div className="FriendsContainer" key={item.id}>
                            <img src={item.profile_picture_url} />
                            <p>{item.firstname}</p>
                            <button id={item.id} onClick={unfriendClick}>
                                End Friendship
                            </button>
                        </div>
                    );
                })}
        </>
    );
}
