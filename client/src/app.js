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
            showModal: true,
        };
        this.onProfileClick = this.onProfileClick.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onUpload = this.onUpload.bind(this);
    }
    componentDidMount() {
        fetch("/api/users/me")
            .then((response) => response.json())
            .then((data) => {
                console.log("DATAAAA", data);
                this.setState({
                    // this can be this.setState(data) of course
                    firstname: data.firstname,
                    lastname: data.lastname,
                    profile_picture_url: data.profile_picture_url,
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
        this.setState({ profile_picture_url: new_profile_url });
        // update the state with the new_profile_url
        // remember to close the modal!
    }

    render() {
        console.log("STATE", this.state);
        return (
            <div className="app">
                <header>
                    <div id="logged">
                        <div className="header">
                            <img id="logo" src="/images/logo.png" alt="LOGO" />
                            <nav>Home</nav>

                            <form>
                                <button>Logout</button>
                            </form>

                            <ProfilePicture
                                profile_picture_url={
                                    this.state.profile_picture_url
                                }
                                onClick={this.onProfileClick}
                            />
                        </div>
                    </div>
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
                    onUpload={this.onUpload}
                    closeModal={this.closeModal}
                    pictureUrl={this.state.profile_picture_url}
                />

                <footer>2020 ACME</footer>
            </div>
        );
    }
}
