import { Component } from "react";

export default class Logout extends Component {
    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit(e) {
        e.preventDefault();
        console.log("ERRRRRRRRO");
        fetch("/logout").then(location.replace("/"));
    }
    render() {
        return (
            <>
                <div className="logout" onClick={this.onSubmit}>
                    Logout
                </div>
            </>
        );
    }
}
