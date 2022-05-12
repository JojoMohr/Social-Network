import { Component } from "react";
import ProfilePictureModal from "./profilePictureModal";
import ProfilePicture from "./profilePicture";
import Profile from "./profile";
//===========FUNCTION COMPONENT============================================

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            // the first three entries will come from the server
            firstname: "",
            lastname: "",
            profile_picture_url: "",
            showModal: false,
            bio: "",
        };
        //binding all functions in the component so that they can be accessed with this
        this.onProfileClick = this.onProfileClick.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onUpload = this.onUpload.bind(this);
        this.onBioUpdate = this.onBioUpdate.bind(this);
    }
    //fires right after the page is loaded
    componentDidMount() {
        fetch("/api/users/me")
            .then((response) => response.json())
            .then((data) => {
                // Sets all props accordingly
                this.setState({
                    firstname: data.firstname,
                    lastname: data.lastname,
                    profile_picture_url: data.profile_picture_url,
                    bio: data.bio,
                });
            })
            .catch((error) => console.log(error));
    }

    onProfileClick() {
        console.log("CLICK ON PROFILE");
        this.setState({ showModal: true });
    }

    closeModal() {
        console.log("CLICK ON CLOSE");
        this.setState({ showModal: false });
    }

    onUpload(new_profile_url) {
        console.log("UPDATED PROFILEPIC");
        // update the state with the new_profile_url
        this.setState({ profile_picture_url: new_profile_url });
        // remember to close the modal!
        this.setState({ showModal: false });
    }

    onBioUpdate(newBio) {
        console.log("New Bio Updated", newBio);
        this.setState({ bio: newBio });
    }

    render() {
        console.log("STATE", this.state);
        return (
            <div className="app">
                <header className="header">
                    <img id="logo" src="/images/logo.png" alt="LOGO" />
                    <form>{/* <button>Logout</button> */}</form>
                    <ProfilePicture
                        profile_picture_url={this.state.profile_picture_url}
                        onProfileClick={this.onProfileClick}
                    />
                </header>
                {this.state.showModal && (
                    <ProfilePictureModal
                        closeModal={this.closeModal}
                        onUpload={this.onUpload}
                    />
                )}

                <Profile
                    firstname={this.state.firstname}
                    lastname={this.state.lastname}
                    profile_picture_url={this.state.profile_picture_url}
                    bio={this.state.bio}
                    onUpload={this.onUpload}
                    closeModal={this.closeModal}
                    onProfileClick={this.onProfileClick}
                    showModal={this.showModal}
                    onBioUpdate={this.onBioUpdate}
                />

                <footer>2022 NETSTER</footer>
            </div>
        );
    }
}
