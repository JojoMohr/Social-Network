import BioEditor from "./bioEditor";
import ProfilePicture from "./profilePicture";
// import ProfilePictureModal from "./profilePictureModal";
// import ProfilePictureModal from "./profilePictureModal";
import Friends from "./friends";
import Chat from "./chat";
import PosPostWall from "./postWall";

// this is a functional one!
export default function Profile({
    // props:
    firstname,
    lastname,
    profile_picture_url,
    bio,
    onBioUpdate,
    onProfileClick,
    userId,
    // showModal = false,
    // closeModal,
    // onUpload,
}) {
    return (
        // display the user avatar (reuse <ProfilePicture> and pass the right props to it)
        <div className="profilePage">
            <main className="profileInfo">
                <h1>
                    {firstname} {lastname}
                </h1>
                <div className="bigProfile">
                    <ProfilePicture
                        profile_picture_url={profile_picture_url}
                        onProfileClick={onProfileClick}
                    />
                </div>

                <BioEditor
                    firstname={firstname}
                    lastname={lastname}
                    bio={bio}
                    onBioUpdate={onBioUpdate}
                ></BioEditor>
            </main>
            <div className="profilePageContent">
                <PosPostWall
                    userId={userId}
                    profile_picture_url={profile_picture_url}
                />
            </div>
        </div>
    );
}
