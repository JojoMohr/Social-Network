import { Component } from "react";
import { Link } from "react-router-dom";

//import Register from "./register.js";

export default class Login extends Component {
    constructor() {
        super(); // WHAT DO WE DO WITH THIS
        this.state = {}; // WE DO WITH THIS

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleLogout = this.handleLogout.bind(this);
    }

    handleChange(e) {
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log(this.state)
        );
    }
    handleSubmit(e) {
        console.log("USER LOGIN 📝");

        e.preventDefault();
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log("RESULTS", result);
                if (!result.success) {
                    this.setState({
                        error: true,
                    });
                } else {
                    console.log("ELSE BLOCK");
                    location.reload();
                    window.location.href = "/";
                } // if all goes to plan, refresh the page
            })
            .catch((error) => {
                console.log("ERROR", error);
            });
    }

    render() {
        return (
            <form
                className="register-login-container"
                onSubmit={this.handleSubmit}
            >
                <h1> Please Login </h1>
                <div className="trenner"></div>
                <div className="register-login-form">
                    <input
                        onChange={this.handleChange}
                        type="email"
                        name="email"
                        placeholder="Email Address"
                    />
                    <input
                        onChange={this.handleChange}
                        type="password"
                        name="password"
                        placeholder="Password"
                    />
                    <button> Login </button>
                    {this.state.error && <p>Oops, something went wrong!</p>}
                </div>
                <Link to="/"> Click here to Register! </Link>
                <Link to="/"> Forgot your Password? </Link>
            </form>
        );
    }
}
