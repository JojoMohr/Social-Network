import BioEditor from "./bioEditor";
import ProfilePicture from "./profilePicture";

// this is a functional one!
export default function Profile({
    // props:
    firstname,
    lastname,
    profile_picture_url,
    bio,
    onBioUpdate,
}) {
    // the user info needed to be displayed
    // a function to be called when the bio is updated

    return (
        // display the user avatar (reuse <ProfilePicture> and pass the right props to it)
        <div className="profile">
            <main className="container">
                <h1>
                    {firstname} {lastname}
                </h1>
            </main>

            <ProfilePicture profile_picture_url={profile_picture_url} />

            <BioEditor bio={bio} onBioUpdate={onBioUpdate}></BioEditor>
        </div>
    );
}
