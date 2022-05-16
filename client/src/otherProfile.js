import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import ProfilePicture from "./profilePicture";
import FrienshipButton from "./friendshipButton";

export default function OtherProfile() {
    const { otherUserId } = useParams();
    const [err, setErr] = useState(false);
    const [user, setUser] = useState({});
    const history = useHistory();
    console.log("history:", history);
    useEffect(() => {
        let abort = false;

        console.log("otherProfile  rendered for the first time 🔄");
        // #1st we need to know which user we should show!
        console.log(
            "the ID of user we want to request information for is:",
            otherUserId
        );
        // #2nd is make a request to fetch this data from the server
        fetch(`/api/user/${otherUserId}`)
            .then((res) => res.json())
            .then((user) => {
                console.log("USER!!!!", user);

                // THIS LOG IS NOT SHIWING ❌
                // if (user.error == "I DIDNT FIND ANYTING") {
                //     console.log("I DIDNT FIND ANYTING", user.error);
                //     return history.push("/findpeople");
                // }
                if (
                    user.error == "THIS IS YOU" ||
                    user.error == "I DIDNT FIND ANYTING"
                ) {
                    console.log("THIS IS YOU", user.error);
                    history.push("/");
                }

                if (!abort) {
                    // so that in our return we can render this information
                    // #3.b the server tells us this user doesn't exist
                    //our way of handling this could be that we set an error state

                    // #3.c the server tells us this is our own profile

                    if (!user) {
                        // setErr(true);
                        console.log("IAM HERE");
                        history.push("/findpeople");
                    } else {
                        // #3.a upon response we will want to add our user data into state,
                        setUser(user);
                    }
                }
            });
        return () => {
            abort = true;
        };
    }, [otherUserId]);
    return (
        <div className="profilePage">
            <main className="profileInfo">
                <h1>
                    {user.firstname} {user.lastname}
                </h1>
                <ProfilePicture
                    className="bigProfilePicture"
                    profile_picture_url={user.profile_picture_url}
                />

                <div className="textarea">
                    <p> {user.bio}</p>
                </div>
                <FrienshipButton otherUserId={otherUserId} />
            </main>
            <div className="profilePageContent">
                <p>THIS IS WHERE THE INFO GOES!</p>
            </div>
            {err && <h2>ERORROROR</h2>}
            {/* {err ? "HELLO" : "NO HELLO"} */}
        </div>
    );
}
