import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Logout from "./logout";

export default function findPeople() {
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
