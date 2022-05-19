// Reducer ------------------------------------------
export function friendsAndWannabesReducer(friendsAndWannabes = [], action) {
    // Your Logic Goes Here
    console.log("ACTION IN SLICE 🟢 ", action);
    if (action.type == "receiveFriendsAndWannabes") {
        console.log(
            "ACTION IN SLICE receiveFriendsAndWannabes 🟠",
            action.payload,
            [...friendsAndWannabes, ...action.payload]
        );
        // put data into glibal state

        friendsAndWannabes = [...action.payload];
        console.log("friendsAndWannabes ❤️", friendsAndWannabes);
    } else if (action.type === "unfriend") {
        console.log("ACTION IN  UNFRIEND🟠", action);

        friendsAndWannabes = friendsAndWannabes.filter((friend) => {
            if (friend.id !== action.payload.id) {
                return friend;
            }
        });
    } else if (action.type === "accept") {
        console.log("ACTION IN  ACCEPT 🟠", action);
        friendsAndWannabes = friendsAndWannabes.map((friend) => {
            if (friend.id == action.payload.id) {
                return {
                    ...friend,
                    accepted: true,
                };
            } else {
                return friend;
            }
        });
    }
    return friendsAndWannabes;
}

// ACTION CREATORS -----------------------------------
// Your action creators go here
// Action Creators
// receiveFriendsAndWannabees() to populate the state with our initial data

export function receiveFriendsAndWannabes(action) {
    console.log("ACTION IN SLICE 1 🟠", action);
    return {
        type: "receiveFriendsAndWannabes",
        payload: action,
    };
}

// unfriend() to remove someone from the list of friends and wannabes

export function unfriend(id) {
    return {
        type: "unfriend",
        payload: { id },
    };
}
// accept() to accept a friendship request

export function accept(id) {
    return {
        type: "accept",
        payload: { id },
    };
}

// (Bonus: reject())
