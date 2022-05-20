import { Component } from "react";
import ProfilePictureModal from "./profilePictureModal";
import ProfilePicture from "./profilePicture";
import Profile from "./profile";
import { BrowserRouter, Route, Link } from "react-router-dom";
import FindPeople from "./findPeople";
import OtherProfile from "./otherProfile";
// import Logout from "./logout";
import DropdownMenu from "./dropdownMenu";
import Friends from "./friends";
import Chat from "./chat";

// import { Spring } from "react-spring";
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
            showMenu: false,
            bio: "",
        };
        //binding all functions in the component so that they can be accessed with this
        this.onProfileClick = this.onProfileClick.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onUpload = this.onUpload.bind(this);
        this.onBioUpdate = this.onBioUpdate.bind(this);
        this.onMenuClick = this.onMenuClick.bind(this);
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

    onMenuClick() {
        console.log("CLICK ON MENU", this.state.showMenu);
        this.setState({ showMenu: !this.state.showMenu });
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
                <BrowserRouter>
                    <header className="header">
                        <Link to="/">
                            <img id="logo" src="/images/logo.png" alt="LOGO" />
                        </Link>
                        <div className="findPeopleForm">
                            <FindPeople />
                        </div>
                        <ProfilePicture
                            profile_picture_url={this.state.profile_picture_url}
                            onProfileClick={this.onProfileClick}
                        />
                        <p>{this.state.firstname}</p>
                        <p className="menuButton" onClick={this.onMenuClick}>
                            𝍂
                        </p>

                        {this.state.showMenu && (
                            <div className="dropdown-menu">
                                <DropdownMenu
                                    onProfileClick={this.onProfileClick}
                                />
                            </div>
                        )}
                    </header>
                    {this.state.showModal && (
                        <ProfilePictureModal
                            closeModal={this.closeModal}
                            onUpload={this.onUpload}
                        />
                    )}
                    <div className="findPeopleForm">
                        <Route path="/findpeople">
                            <FindPeople />
                        </Route>
                    </div>
                    <Route exact path="/">
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
                    </Route>
                    <Route path="/user/:otherUserId">
                        <OtherProfile />
                    </Route>
                    <Route path="/friends">
                        <Friends />
                    </Route>{" "}
                    <Route path="/chat">
                        <Chat />
                    </Route>
                </BrowserRouter>

                <footer>2022 NETSTER</footer>
            </div>
        );
    }
}
