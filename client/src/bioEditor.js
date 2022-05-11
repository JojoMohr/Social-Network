import { Component } from "react";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.showEditor = this.showEditor.bind(this);
        // bind things!

        // function to switch to edit mode
    }

    showEditor() {
        this.setState({ isEditing: true });
    }

    onSubmit(e) {
        e.preventDefault();
        // extract the bio
        const newBio = e.target.bio.value;
        // make the right HTTP call
        fetch("/api/user/me", {
            method: "PUT",
            body: JSON.stringify({ bio: newBio }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        // call the function passed as a prop
    }
    render() {
        // If !this.props.bio then render "ADD BIO BUTTON"
        if (!this.props.bio && !this.state.isEditing) {
            return <button onClick={this.showEditor}>ADD BIO</button>;
        }
        // if this.state.isEditing then render render INPUT FIELD & SAVE BIO BUTTON
        if (this.state.isEditing) {
            return (
                <form onSubmit={this.onSubmit}>
                    <textarea id="addbio" name="bio"></textarea>
                    <button id="savebio">SAVE BIo</button>
                </form>
            );
        }
        // IF !this.state.isEditing && this.props.bio
        if (!this.state.isEditing && this.props.bio) {
            return (
                <>
                    <p>{this.props.bio}</p>
                    <button onClick={this.showEditor}>CHANGE BIO</button>
                </>
            );
        }
    }
}
