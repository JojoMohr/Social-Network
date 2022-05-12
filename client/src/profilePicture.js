export default function ProfilePicture({
    profile_picture_url,
    onProfileClick,
}) {
    return (
        <img
            className="profilePictureHeader"
            src={profile_picture_url}
            onClick={onProfileClick}
            placeholder="Profilpic"
        />
    );
}
