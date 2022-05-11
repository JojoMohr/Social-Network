import BioEditor from "./bioEditor";
import ProfilePicture from "./profilePicture";
// import ProfilePictureModal from "./profilePictureModal";

// this is a functional one!
export default function Profile({
    // props:
    firstname,
    lastname,
    profile_picture_url,
    bio,
    onBioUpdate,
}) {
    console.log("URL", profile_picture_url);
    return (
        // display the user avatar (reuse <ProfilePicture> and pass the right props to it)
        <div className="profile">
            <main className="container">
                <h1>
                    {firstname} {lastname}
                </h1>
                <ProfilePicture profile_picture_url={profile_picture_url} />

                <BioEditor bio={bio} onBioUpdate={onBioUpdate}></BioEditor>
            </main>
        </div>
    );
}
