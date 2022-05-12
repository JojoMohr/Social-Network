import { useState } from "react";
import { useEffect } from "react";

export default function findPeople() {
    const [user, setUser] = useState();
    const [searchResults, setSearchResults] = useState([]);

    console.log("SEARCHRESULTS", searchResults);
    console.log("LOOKING FOR USER:", user);

    useEffect(() => {
        console.log("In Use Effect [ComponentDidMount]");
        // e.preventDefault();
        // THIS CAN BE ADDE AFTER THE 3 DEFAULT USERS ARE BEEING ❌DISPLAYED
        // fetch("/findPeople", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         user,
        //     }),
        // })
        //     .then((res) => res.json())
        //     .then((res) => {
        //         console.log("RESULTS IN FIND PEOPLE POST: ➡️", res);
        //         setSearchResults(res);
        //     })
        //     .catch((err) => {
        //         console.log("ERROR", err);
        //     });
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();

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
    };

    return (
        <>
            <h1> Searches for people </h1>
            <form onSubmit={handleSubmit}>
                <input
                    onSubmit={handleSubmit}
                    onChange={(e) => setUser(e.target.value)}
                    name={"user"}
                />
                <button>Submit</button>
            </form>
            <div id="all-found-users">
                {searchResults.map((user) => (
                    <div id="found-users" key={user.id}>
                        <img src={user.profile_picture_url}></img>
                        <p>
                            {user.firstname} {user.lastname}
                        </p>
                    </div>
                ))}
            </div>
        </>
    );
}
