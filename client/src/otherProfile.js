import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import BioEditor from "./bioEditor";
import ProfilePicture from "./profilePicture";

export default function OtherProfile() {
    const { otherUserId } = useParams();
    const [err, setErr] = useState("");
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
                console.log("USER", user);

                if (!abort) {
                    // so that in our return we can render this information
                    // #3.b the server tells us this user doesn't exist
                    //our way of handling this could be that we set an error state
                    // #3.c the server tells us this is our own profile
                    if (!user) {
                        // setErr("THIS USER DOESN'T EXISTS");
                        history.push("/");
                    } else {
                        // #3.a upon response we will want to add our user data into state,
                        setUser(user);
                    }
                }
            });
        return () => {
            abort = true;
        };
    }, []);
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
            </main>
            <div className="profilePageContent">
                <p>THIS IS WHERE THE INFO GOES!</p>
            </div>
        </div>
    );
}
