import { useState, useEffect } from "react";

export default function Friends() {
    // const friends = useSelector((state) => {
    //     return state.friendsAndWannabes.filter(({ accepted }) => accepted);
    // });
    // const wannabes = useSelector((state) => {
    //     return state.friendsAndWannabes.filter(({ accepted }) => !accepted);
    // });

    useEffect(() => {
        console.log("FETCHING DATA FROM /friends-and-wannabes");
        fetch("/friends-and-wannabes")
            .then((res) => res.json())
            .then((result) => {
                console.log("Friends and Wannaabeeeees", result);
            })
            .catch((err) => {
                console.log("error in FETCH", err);
            });
    }, []);

    return (
        <div>
            <h1>This is the Friendds Page </h1>
        </div>
    );
}
