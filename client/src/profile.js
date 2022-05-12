import BioEditor from "./bioEditor";
import ProfilePicture from "./profilePicture";
import ProfilePictureModal from "./profilePictureModal";
// import ProfilePictureModal from "./profilePictureModal";

// this is a functional one!
export default function Profile({
    // props:
    firstname,
    lastname,
    profile_picture_url,
    bio,
    onBioUpdate,
    onProfileClick,
    showModal = false,
    closeModal,
    onUpload,
}) {
    console.log("URL", profile_picture_url);
    return (
        // display the user avatar (reuse <ProfilePicture> and pass the right props to it)
        <div className="profilePage">
            <main className="profileInfo">
                <h1>
                    {firstname} {lastname}
                </h1>
                <ProfilePicture
                    className="bigProfilePicture"
                    onClick={onProfileClick}
                    profile_picture_url={profile_picture_url}
                />
                {/* {showModal && (
                    <ProfilePictureModal
                        closeModal={closeModal}
                        onUpload={onUpload}
                    />
                )} */}
                <BioEditor
                    firstname={firstname}
                    lastname={lastname}
                    bio={bio}
                    onBioUpdate={onBioUpdate}
                ></BioEditor>
            </main>
            <div className="profilePageContent">
                <p>THIS IS WHERE THE INFO GOES!</p>
            </div>
        </div>
    );
}
