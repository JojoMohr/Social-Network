export default function ProfilePicture({ profile_picture_url, onClick }) {
    return (
        <img
            src={profile_picture_url}
            onClick={onClick}
            placeholder="Profilpic"
            height="50px"
            width="50px"
            border="2px solid"
            border-radius="5px"
        />
    );
}
