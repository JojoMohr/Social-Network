import ReactDOM from "react-dom";
import Welcome from "./welcome";
// import handleLogout from "./login";

fetch("/user/id.json")
    .then((res) => res.json())
    .then((data) => {
        console.log("DATA", data);
        if (!data.userId) {
            ReactDOM.render(< Welcome />, document.querySelector("main"));
        } else {
            ReactDOM.render(<>
                <div id="logged">
                    <div className="header">
                        <img id="logo" src="/images/logo.png" alt="LOGO" />
                        <form>
                            <button>Logout</button>
                        </form>
                    </div>
                    {/* <h2>YOU ARE LOGGED IN MY FRIEND</h2>
                    <img src="./images/logo.png" /> */}
                </div>
            </>, document.querySelector("main")
            );
        }
    })
    .catch((err) => console.log(err));


//===============LOGOUT ?!========================
// handleLogout(e) {
//     console.log("USER LOGOUT 📝");

//     e.preventDefault();
//     fetch("/logout", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             email: this.state.email,
//             password: this.state.password,
//         }),
//     })
//         .then()
//         // .then((res) => res.json())
//         // .then((result) => {
//         //     console.log("RESULTS", result);
//         //     if (!result.success) {
//         //         this.setState({
//         //             error: true,
//         //         });
//         //     } else {
//         //         console.log("ELSE BLOCK");
//         //         location.reload();
//         //         //    window.location.href = "/"
//         //     } // if all goes to plan, refresh the page
//         // })
//         .catch((error) => {
//             console.log("ERROR", error);
//         });
// }