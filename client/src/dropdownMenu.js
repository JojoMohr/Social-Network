import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Logout from "./logout";
// import { Spring } from "react-spring";
export default function findPeople({ onProfileClick }) {
    const [menu, setMenu] = useState();

    useEffect(() => {
        console.log("WE ARE IN dropdown");
    });

    return (
        <>
            <div>
                <ul className="dropNav">
                    <li>
                        <Link to="/">Profile</Link>
                    </li>
                    <Link>
                        <li onClick={onProfileClick}>Change Picture</li>
                    </Link>
                    <li>
                        <Link>
                            <Logout />
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
}
// const c1Style = {
//     color: "white",
//     padding: "1.5rem",
//     position: "fixed",
//     height: "220px",
//     width: "189px",
//     border: "solid 2px lightgray",
//     backgroundColor: "gray",
//     right: "6px",
//     top: "70px",
// };
