import { Component } from "react";

export default class BioEditor extends Component {
    constructor(props) {
        console.log("BIO PROPS", props.bio);
        super(props);
        this.state = {
            isEditing: false,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.showEditor = this.showEditor.bind(this);
        this.closeEditor = this.closeEditor.bind(this);
        // bind things!

        // function to switch to edit mode
    }

    showEditor() {
        this.setState({ isEditing: true });
    }

    closeEditor() {
        this.setState({ isEditing: false });
    }

    onSubmit(e) {
        e.preventDefault();
        // extract the bio
        const newBio = e.target.bio.value;
        // make the right HTTP call
        fetch("/api/users/bio", {
            method: "POST",
            body: JSON.stringify({ bio: newBio }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(("BIO FROM FETCHED: ", data));
                const bio = data.rows[0].bio;
                this.props.onBioUpdate(bio);
                this.closeEditor();
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
                    <textarea className="textarea"
                   
                        name="bio"
                    ></textarea>
                    <button id="savebio">SAVE BIO</button>
                    <button type="button" onClick={this.closeEditor}>
                        CANCEL
                    </button>
                </form>
            );
        }
        // IF !this.state.isEditing && this.props.bio
        if (!this.state.isEditing && this.props.bio) {
            return (
                <>
                    <p>{this.props.firstname}'s BIO</p>
                    <p className="bio">{this.props.bio}</p>
                    <button onClick={this.showEditor}>CHANGE BIO</button>
                </>
            );
        }
    }
}
