import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Logout from "./logout";
import Friends from "./friends";
import Chat from "./chat";
// import { Spring } from "react-spring";
export default function findPeople({ onProfileClick, onChatClick }) {
    const [menu, setMenu] = useState();

    useEffect(() => {
        console.log("WE ARE IN dropdown");
    });

    return (
        <>
            <div>
                <di className="dropdown-arrow"></di>

                <div className="dropNav">
                    <div className="menu-auswahl-container">
                        <p>
                            <Link to="/">Profile</Link>
                        </p>
                    </div>
                    <Link>
                        <div className="menu-auswahl-container">
                            <p onClick={onProfileClick}>Change Picture</p>
                        </div>
                    </Link>
                    <div className="menu-auswahl-container">
                        <p>
                            <Link to="/friends">Friends</Link>
                        </p>
                    </div>
                    <p>
                        <Link>
                            <div className="menu-auswahl-container">
                                <p onClick={onChatClick}>Chat</p>
                            </div>
                        </Link>
                    </p>
                    <p>
                        <hr className="trenner"></hr>
                        <Link>
                            <div className="menu-auswahl-container logout">
                                <Logout />
                            </div>
                        </Link>
                    </p>
                </div>
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
