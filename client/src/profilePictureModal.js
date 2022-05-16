export default function ProfilePictureModal({ closeModal, onUpload }) {
    function onSubmit(e) {
        // Prevent the default form submission behavior
        e.preventDefault();

        // Create your data with the right encoding
        const formData = new FormData();
        console.log("ETARGET FILE", e.target.file);
        formData.append("file", e.target.file.files[0]);
        // Trigger an Ajax to the server:
        fetch("/api/profile_picture", {
            method: "POST",
            body: formData,
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log("RESPONSE", data);
                onUpload(data.url);
                // this.images.unshift(insertedImage);
            })
            .catch((error) => {
                console.log("ERROR", error);
            });
    }

    return (
        <div className="profilImageUpload">
            <button className="closeImageUpload" onClick={closeModal}>
                &times;
            </button>
            <div className="modal-content">
                <h2>Upload your profile picture!</h2>
                <form onSubmit={onSubmit} className="modal-form">
                    <input type="file" required name="file" />
                    <button className="uploadPictureButton">Upload</button>
                </form>
            </div>
        </div>
    );
}
