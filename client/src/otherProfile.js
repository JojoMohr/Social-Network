import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router";
import ProfilePicture from "./profilePicture";
import FrienshipButton from "./friendshipButton";
import PostWall from "./postWall";

export default function OtherProfile({ profile_picture_url }) {
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

                if (
                    user.error == "THIS IS YOU" ||
                    user.error == "I DIDNT FIND ANYTING"
                ) {
                    console.log("THIS IS YOU", user.error);
                    history.push("/");
                }

                if (!abort) {
                    if (!user) {
                        console.log("IAM HERE");
                        history.push("/findpeople");
                    } else {
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

                <div className="textarea bio">
                    <p> {user.bio}</p>
                </div>
                <FrienshipButton otherUserId={otherUserId} />
            </main>
            <div className="profilePageContent">
                <PostWall profile_picture_url={profile_picture_url} />
            </div>
            {err && <h2>ERORROROR</h2>}
            {/* {err ? "HELLO" : "NO HELLO"} */}
        </div>
    );
}
