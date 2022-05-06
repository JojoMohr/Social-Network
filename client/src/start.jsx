import ReactDOM from "react-dom";
import Welcome from "./welcome.jsx";

fetch("/user/id.json")
    .then((res) => res.json())
    .then((data) => {
        console.log("DATA", data);
        if (!data.userId) {
            ReactDOM.render( <Welcome/> , document.querySelector("main"));
        } else {
            ReactDOM.render( 
                // <img src = "/logo.jog"/> ,
                document.querySelector("main")
            );
        }
    })
    .catch(err => console.log(err));

