import { Component } from "react";
import { Link } from "react-router-dom";

export default class Register extends Component {
    constructor() {
        super();
        this.state = {};
        this.success = true;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        e.preventDefault();
        console.log("USER TRIED TO SUBMIT");
        fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
                password: this.state.password,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.success == true) {
                    location.reload();
                } // if all goes to plan, refresh the page
                if (!result.success) {
                    this.setState({ error: true });
                }
            })
            .catch((error) => {
                // if something goes wrong => render an error
                console.log("ERROR", error);
            });
    }

    render() {
        return (
            <>
                <div className="register-login-container">
                    <h1>Please Register </h1>
                    <div className="trenner"></div>
                    {this.state.error && <p>Oops, something went wrong!</p>}
                    <form
                        className="register-login-form"
                        onSubmit={this.handleSubmit}
                    >
                        <input
                            onChange={this.handleChange}
                            type="text"
                            name="firstname"
                            placeholder="First Name"
                        />
                        <input
                            onChange={this.handleChange}
                            type="text"
                            name="lastname"
                            placeholder="Last Name"
                        />
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
                        <button>Submit</button>
                    </form>
                    <Link to="/login">Click here to Log in!</Link>
                </div>
            </>
        );
    }
}
