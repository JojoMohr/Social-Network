import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";

fetch("/user/id.json")
    .then((res) => res.json())
    .then((data) => {
        // console.log("DATA", data);
        if (!data.userId) {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {
            console.log("ABOUT TO RENDER THAT APP SHIt BABBYYY");
            ReactDOM.render(<App />, document.querySelector("main"));
        }
    })
    .catch((err) => console.log(err));
