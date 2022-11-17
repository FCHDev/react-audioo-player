import React, {useState} from 'react';
import ButtonAddSong from "./ButtonAddSong";
import { set } from "firebase/database";
import { refDb } from "../config/firebase-config";
import { db, storage } from "../config/firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const AdminPanel = ({tracksNumber, setArtist, setTitle, artist, title, imgURL, setImgURL, soundURL, setSoundURL}) => {
    // STATES

    /// UPLOAD IMAGES
    const [imageUpload, setImageUpload] = useState(null);
    const [picPreview, setPicPreview] = useState();

    const uploadImage = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
        uploadBytes(imageRef, imageUpload)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    setImgURL(url);
                    console.log(url)
                    setPicPreview(
                        <div className="w-52 h-52">
                            <img src={url} alt="artist" />
                        </div>
                    );
                });
                console.log("Image uploaded");
            })
            .catch((error) => {
                console.error(error);
            });
    };

    /// UPLOAD SOUNDS
    const [soundUpload, setSoundUpload] = useState(null);

    const uploadSound = () => {
        if (soundUpload == null) return;
        const soundRef = ref(storage, `sounds/${soundUpload.name + v4()}`);
        const metadata = {
            contentType: 'audio/mpeg',
        };
        uploadBytes(soundRef, soundUpload, metadata)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref).then((trackUrl) => {
                    setSoundURL(trackUrl);
                    console.log("Sound uploaded 😘 => " + trackUrl)
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    // FONCTION POUR CREER NOUVEAU TRACK
    const writeUserData = () => {
        // const trackId = () => {
        //   return tracksNumber === null || tracksNumber === undefined ? 0 : tracksNumber
        // }
        const trackId = tracksNumber
        set(refDb(db, `/${trackId}`), {
            trackId,
            artist,
            title,
            imgURL,
            soundURL
        });
        setArtist("")
        setTitle("")
        setImgURL("")
        setSoundURL("")
        // setId(0)
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        writeUserData();
        // REFRESH PAGE ET SCROLL AU TOP APRES SOUMISSION
        window.scrollTo(0, 0);
        alert(artist + " - " + title + " bien créé !");
    };


    return (
        <div className="md:w-52 w-52 md:h-max h-72 mx-auto mt-24">
            <form className="flex flex-col">

                <div className="mx-auto mb-2">
                    <label>Artist</label>
                    <input type="text" onChange={(event) => {setArtist(event.target.value)}} className="px-3 w-44"/>
                </div>
                <div>
                    <label>Titre</label>
                    <input type="text" onChange={(event) => {setTitle(event.target.value)}} className="px-3 w-44"/>
                </div>
            </form>

            <div className="mt-5">
                <label htmlFor="inputTag">
                    {" "}
                    Select Image
                    <input
                        id="inputTag"
                        type="file"
                        onChange={(event) => {
                            setImageUpload(event.target.files[0]);
                        }}
                        className="cursor-pointer"
                    />{" "}
                </label>
                <label htmlFor="inputButtonTag">
                    {" "}
                    Upload Image
                    <input className="bg-white cursor-pointer" id="inputButtonTag" type="button" onClick={uploadImage} />{" "}
                </label>
            </div>
            {picPreview}

            <div className="mt-5">
                <label htmlFor="inputTag">
                    {" "}
                    Select Sound
                    <input
                        id="inputTag"
                        type="file"
                        onChange={(event) => {
                            setSoundUpload(event.target.files[0])
                            console.log(soundUpload);
                        }}
                        className="cursor-pointer"
                    />{" "}
                </label>
                <label htmlFor="inputMusicButtonTag">
                    {" "}
                    Upload Sound
                    <input className="bg-white" id="inputMusicButtonTag" type="button" onClick={uploadSound} />{" "}
                </label>
            </div>

            <div className="w-full mx-auto mt-5">
                <ButtonAddSong submit={handleSubmit}>Submit</ButtonAddSong>
            </div>
        </div>
    );
};

export default AdminPanel;