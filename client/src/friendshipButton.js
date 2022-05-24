import { useState, useEffect } from "react";

export default function FrienshipButton({ otherUserId }) {
    const [buttonText, setButtonText] = useState("");

    // console.log("Other user id in button: ", otherUserId);

    useEffect(() => {
        // console.log("We are on User page :", otherUserId);

        fetch(`/get-friendship-status/${otherUserId}`)
            .then((res) => res.json())
            .then((res) => {
                if (res.error) {
                    return console.log(
                        "ERROR WITH GEtTING FRIENDSHIP STATUS",
                        res.error
                    );
                }
                return setButtonText(res.status);
            })
            .catch((err) => {
                console.log("ERROR", err);
            });
    });

    function handleClick() {
        fetch("/set-friendship-status", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                recipient_id: otherUserId,
                status: buttonText,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log("", res);
                return setButtonText(res.status);
            })
            .catch((err) => {
                console.log("ERROR", err);
            });
    }

  

    return <button onClick={handleClick}>{buttonText}</button>;
}
