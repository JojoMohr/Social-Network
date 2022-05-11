import { BrowserRouter, Route } from "react-router-dom";

import Register from "./register.js";
import Login from "./login";

export default function Welcome() {
    return (
        <div id="welcome">
            <div className="header">
                <img id="logo" src="/images/logo.png" alt="LOGO" />
            </div>
            <BrowserRouter>
                <div className="forms">
                    <Route exact path="/">
                        <Register />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                </div>
            </BrowserRouter>
        </div>
    );
}
