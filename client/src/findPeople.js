import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function findPeople() {
    const [user, setUser] = useState("");
    let [firstShowUsers, setfirstShowUsers] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    console.log("SEARCHRESULTS", searchResults);
    console.log("LOOKING FOR USER:", user);

    useEffect(() => {
        console.log("In Use Effect [ComponentDidMount]");
        // THIS CAN BE ADDE AFTER THE 3 DEFAULT USERS ARE BEEING ❌DISPLAYED
        fetch("/findPeople", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log("RESULTS IN FIND PEOPLE POST: ➡️", res);
                setSearchResults(res);
            })
            .catch((err) => {
                console.log("ERROR", err);
            });
    }, [user]);

    function userSearch() {
        console.log("CLICK ON SEARCH");
        setfirstShowUsers((firstShowUsers = !firstShowUsers));
    }

    return (
        <>
            <div>
                <input
                    className="searchContainer"
                    placeholder="Search for users..."
                    autoComplete="off"
                    onClick={userSearch}
                    // onSubmit={handleSubmit}
                    onChange={(e) => setUser(e.target.value)}
                    name={"user"}
                />
                {/* <button>Submit</button> */}
            </div>
            {firstShowUsers && (
                <div id="all-found-users">
                    {searchResults.map((user) => (
                        <div key={user.id}>
                            <Link to={`/user/${user.id}`}>
                                <div className="found-users">
                                    <img src={user.profile_picture_url}></img>
                                    <p>
                                        {user.firstname} {user.lastname}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
