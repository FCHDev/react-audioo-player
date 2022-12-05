import ControlPanel from "./components/ControlPanel";
import React, {useEffect, useRef, useState} from "react";
import VolumeModule from "./components/VolumeModule";
import convertSecondstoTime from "./functions/convertSecondsToTime";
// import {onValue, ref} from "firebase/database";
// import {db} from "./config/firebase-config";
import ButtonShowPlaylist from "./components/ButtonShowPlaylist";
import ScrollToTop from "react-scroll-to-top";
import trackDb from "./data/trackDb.json"
// import ButtonAdminPanel from "./components/ButtonAdminPanel";
// import AdminPanel from "./components/AdminPanel";


function App() {

    const [id, setId] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTrack, setCurrentTrack] = useState(new Audio())
    const totalDuration = currentTrack.duration
    const [completed, setCompleted] = useState(0)
    const [secondsCount, setSecondsCount] = useState(parseInt((currentTrack.currentTime).toFixed(0)))
    const [secondsDecount, setSecondsDecount] = useState(totalDuration)
    const [volume, setVolume] = useState(0.7)
    // const [admin, setAdmin] = useState(false)

    // REFERENCES
    const audioRef = useRef()
    const progressBar = useRef()

    // SVG HEADPHONES
    const headphones =
        <svg version="1.1" id="Layer_1"
             xmlns="http://www.w3.org/2000/svg"
             xmlnsXlink="http://www.w3.org/1999/xlink"
             x="0px" y="0px"
             width="18px"
             height="18px"
             viewBox="0 0 330 330"
             xmlSpace="preserve"
             fill="white">
            <g id="XMLID_791_">
                <path id="XMLID_792_" d="M300,175.799v-21.557c0-74.44-60.561-135-135-135s-135,60.56-135,135v21.557
                        c-18.204,13.697-30,35.476-30,59.959c0,41.355,33.644,75,75,75c8.284,0,15-6.716,15-15v-120c0-8.284-6.716-15-15-15
                        c-5.136,0-10.152,0.521-15,1.51v-8.025c0-57.897,47.103-105,105-105s105,47.103,105,105v8.025c-4.848-0.989-9.864-1.51-15-1.51
                        c-8.284,0-15,6.716-15,15v120c0,8.284,6.716,15,15,15c41.355,0,75-33.645,75-75C330,211.274,318.204,189.496,300,175.799z"/>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
            <g>
            </g>
        </svg>

    // FETCH FIREBASE
    const [tracks, setTracks] = useState([])
    const [artist, setArtist] = useState("Chargement...")
    const [nextArtist, setNextArtist] = useState()
    const [title, setTitle] = useState("Chargement...")
    const [nextTitle, setNextTitle] = useState()
    const [imgURL, setImgURL] = useState("")
    const [soundURL, setSoundURL] = useState("")
    // eslint-disable-next-line
    const [duration, setDuration] = useState()


    useEffect(() => {
        // onValue(ref(db), (snapshot) => {
        //     const data = snapshot.val();
        //     if (data !== null) {
        //         // eslint-disable-next-line
        //         Object.values([data]).map((track) => {
        //             setTracks(track);
        //             console.log(track)
        //             setArtist(id < track.length ? track[id].artist : track[0].artist)
        //             setTitle(id < track.length ? track[id].title : track[0].title)
        //             setNextArtist(id + 1 < track.length ? `${track[id + 1].artist} - ` :
        //                 <span className="text-main font-bold image-clignote">=== END OF PLAYLIST ===</span>)
        //             setNextTitle(id + 1 < track.length ? track[id + 1].title : "")
        //             setImgURL(id < track.length ? track[id].imgURL : track[0].imgURL)
        //             setSoundURL(id < track.length ? track[id].soundURL : track[0].soundURL)
        //             setCurrentTrack(audioRef.current)
        //             setSecondsDecount(totalDuration)
        //             setDuration(convertSecondstoTime(currentTrack.duration))
        //             isPlaying ? currentTrack.play() : currentTrack.pause()
        //         });
        //         console.log(data)
        //     } else {
        //         console.log("Aucune donnée à afficher")
        //     }
        // });
        // // console.log('Prout 💨')
        const data = [trackDb]
        // console.log(tracks)

        // eslint-disable-next-line
        data.map(track => {
            setTracks(track);
            console.log(track)
            setArtist(id < track.length ? track[id].artist : track[0].artist)
            setTitle(id < track.length ? track[id].title : track[0].title)
            setNextArtist(id + 1 < track.length ? `${track[id + 1].artist} - ` :
                <span className="text-main font-bold image-clignote">=== END OF PLAYLIST ===</span>)
            setNextTitle(id + 1 < track.length ? track[id + 1].title : "")
            setImgURL(id < track.length ? track[id].imgURL : track[0].imgURL)
            setSoundURL(id < track.length ? track[id].soundURL : track[0].soundURL)
            setCurrentTrack(audioRef.current)
            setSecondsDecount(totalDuration)
            setDuration(convertSecondstoTime(currentTrack.duration))
            isPlaying ? currentTrack.play() : currentTrack.pause()
        })
    }, [id, currentTrack, isPlaying, totalDuration]);

    // id, currentTrack, isPlaying, totalDuration

    // console.log(tracks)


    // GESTION DE LA PROGRESS BAR
    const checkWidth = (e) => {
        let width = progressBar.current.clientWidth;
        const offset = e.nativeEvent.offsetX
        const progress = offset / width * 100
        currentTrack.currentTime = progress / 100 * currentTrack.duration
        setSecondsCount(currentTrack.currentTime)
        setSecondsDecount(currentTrack.duration - currentTrack.currentTime)
        setCompleted(progress)
    }

    // GESTION DU TIMER
    // 1. COMPTEUR
    useEffect(() => {
        const progressValue = currentTrack.currentTime / totalDuration * 100
        const interval = setInterval(() => {
            setCompleted(progressValue);
            isPlaying && currentTrack.duration ? setSecondsCount(secondsCount + 1) : setSecondsCount(secondsCount)
        }, 1000);

        return () => clearInterval(interval);
    }, [currentTrack.currentTime, currentTrack.duration, totalDuration, isPlaying, secondsCount]);

    // 2. COMPTE À REBOURS
    useEffect(() => {
        const interval = setInterval(() => {
            isPlaying && currentTrack.duration ? setSecondsDecount(secondsDecount - 1) : setSecondsDecount(secondsDecount)
        }, 1000);

        return () => clearInterval(interval);
    }, [currentTrack.duration, isPlaying, secondsDecount]);

    // GESTION DU TRANSPORT (Panneau de contrôle)
    const handlePlay = () => {
        currentTrack.play()
        setIsPlaying(true)
    }
    const handlePause = () => {
        currentTrack.pause()
        setIsPlaying(!isPlaying)
    }
    const handleStop = () => {
        currentTrack.pause()
        setIsPlaying(false)
        setSecondsCount(0)
        audioRef.current.currentTime = 0;
        setCompleted(0)
    }
    const handleRewind = () => {
        currentTrack.pause()
        setId(id - 1)
        setSoundURL(tracks[id - 1].soundURL)
        setSecondsCount(0)
        setSecondsDecount(convertSecondstoTime(currentTrack.duration))
        setCompleted(0)
        setDuration(convertSecondstoTime(currentTrack.duration))
        setIsPlaying(true)
        setVolume(currentTrack.volume)
        audioRef.currentTime = 0
    }
    const handleForward = () => {
        currentTrack.pause()
        if (id + 1 === tracks.length) {
            setId(0)
            setArtist(tracks[0].artist)
            setTitle(tracks[0].title)
            setNextArtist(tracks[0].artist)
            setNextTitle(tracks[0].title)
            setImgURL(tracks[0].imgURL)
            setSoundURL(tracks[0].soundURL)
            setIsPlaying(false)
        } else {
            setId(id + 1)
            setSoundURL(tracks[id + 1].soundURL)
            setSecondsCount(0)
            setSecondsDecount(convertSecondstoTime(currentTrack.duration))
            setCompleted(0)
            setDuration(convertSecondstoTime(currentTrack.duration))
            setIsPlaying(true)
            setVolume(currentTrack.volume)
            currentTrack.currentTime = 0
        }
    }
    const handleClickSong = (track) => {
        setId(track.trackId)
        setArtist(track.artist)
        setTitle(track.title)
        setImgURL(track.imgURL)
        setSoundURL(track.soundURL)
        setCurrentTrack(audioRef.current)
        setSecondsCount(0)
        setSecondsDecount(convertSecondstoTime(currentTrack.duration))
        setCompleted(0)
        setIsPlaying(true)
        setVolume(currentTrack.volume)
        setDuration(convertSecondstoTime(currentTrack.duration))
        currentTrack.play()
    }

    // ENCHAINER LES TRACKS QUAND ELLES SONT TERMINEES
    if (currentTrack.currentTime === currentTrack.duration) {
        // currentTrack.play()
        setId(id + 1)
        setSoundURL(tracks[id + 1].soundURL)
        setSecondsCount(0)
        setCompleted(0)
        setDuration(convertSecondstoTime(currentTrack.duration))
        setIsPlaying(true)
        setVolume(currentTrack.volume)
        currentTrack.currentTime = 0

    }


    return (
        <>
            {/*<ButtonAdminPanel admin={admin} setAdmin={setAdmin}>*/}
            {/*    Admin Panel*/}
            {/*</ButtonAdminPanel>*/}

            <div className="
                    sm:h-screen
                    md:h-80
                    md:rounded-xl
                    md:min-w-[850px]
                    mx-auto
                    bg-white
                    shadow-md
                    overflow-hidden
                    box-shadow4">

                <div className="h-full w-full md:flex">

                    <div className="md:shrink-0 md:w-80">
                        <img className="sm:h-full w-full object-cover md:h-full sm:w-full"
                             style={{filter: "brightness(90%) contrast(95%) grayscale(50%)"}}
                             src={imgURL}
                             alt={artist}
                             onClick={() => console.log(convertSecondstoTime(secondsCount))}/>
                        <audio ref={audioRef} preload="auto" src={soundURL}></audio>
                    </div>

                    <div className="md:h-full md:w-full md:p-8 sm:p-6">
                        <div className="uppercase tracking-wide sm:text-xl text-main font-semibold">
                            {artist}
                        </div>
                        {title.length < 30
                            ? <div className="h-10 sm:text-xl">
                                    <span>
                                        {title}
                                    </span>
                            </div>
                            : <div className="messagedefilant h-10 sm:text-xl">
                                <div data-text={""}>
                                    <span>
                                        {title + " "}
                                    </span>
                                </div>
                            </div>
                        }

                        {/*PROGRESS BAR*/}
                        <div className="w-full bg-main-light rounded-full h-2.5 dark:bg-gray-700 my-5 cursor-pointer"
                             ref={progressBar}
                             onClick={checkWidth}>
                            <div className="bg-main h-2.5 rounded-full" style={{width: `${completed}%`}}></div>
                        </div>

                        {/*TIME PANEL*/}
                        <div className="flex justify-between">
                            <div
                                className="font-mono text-lg text-main font-bold">{convertSecondstoTime(secondsCount)}</div>
                            <div className="font-mono text-lg">{secondsDecount
                                ? "-" + convertSecondstoTime(secondsDecount)
                                : ""}</div>
                        </div>


                        {/*CONTROL PANEL*/}
                        <ControlPanel
                            play={handlePlay}
                            pause={handlePause}
                            stop={handleStop}
                            rewind={handleRewind}
                            forward={handleForward}
                            isPlaying={isPlaying}
                            tracks={tracks}
                            id={id}/>


                        {/*VOLUME BAR*/}
                        <VolumeModule currentTrack={currentTrack} volume={volume} setVolume={setVolume}/>

                        {/*SHOW PLAYLIST*/}
                        <ButtonShowPlaylist/>

                        {/*NEXT TRACK */}
                        <div className="md:block">
                                <span className="md:py-0 py-4 italic text-xs h-5 text-main"
                                      id="nextSong">
                                    Next song : {nextArtist} {nextTitle}
                                </span>
                        </div>

                    </div>
                </div>
            </div>
            {/*{admin ? <AdminPanel*/}
            {/*    tracksNumber={tracks.length}*/}
            {/*    id={id}*/}
            {/*    setId={setId}*/}
            {/*    artist={artist}*/}
            {/*    setArtist={setArtist}*/}
            {/*    title={title}*/}
            {/*    setTitle={setTitle}*/}
            {/*    imgURL={imgURL}*/}
            {/*    setImgURL={setImgURL}*/}
            {/*    soundURL={soundURL}*/}
            {/*    setSoundURL={setSoundURL}*/}
            {/*/> : ""}*/}

            <div className="flex justify-center align-middle
            md:mt-10
            sm:mt-0
            md:bg-white
            sm:w-5/6
            md:text-xl
            sm:text-sm
            mx-auto
            md:w-[850px]
            md:rounded-xl
            py-4
            md:px-2
            md:h-max
            sizePlaylist
            ">
                <ul>
                    <h2 className="uppercase text-4xl text-main font-bold font-[Sono] pb-4 text-center"
                        id="playlist">
                        Playlist
                    </h2>
                    {tracks.map((track) => (
                        <div key={track.trackId} className="flex min-w-full mx-auto relative">
                            <li onClick={() => handleClickSong(track)}
                                className="w-full text-white text-base rounded-xl
                                            bg-main
                                            py-2
                                            px-3
                                            my-2
                                            hover:text-blue-700
                                            hover:bg-white
                                            hover:text-main
                                            hover:cursor-pointer
                                            hover:duration-500
                                            hover:ease-out">
                                <strong>{track.artist}</strong> - {track.title}
                            </li>
                            {id === track.trackId && isPlaying
                                ? <div className="flex flex-col justify-center items-center h-8 w-8 rounded-full bg-red absolute
                                md:-right-4 md:-top-1
                                sm: right-0 md:-top-1 image-clignote text-xs
                                text-white">
                                    {headphones}
                                </div>
                                : ""}
                        </div>
                    ))}
                </ul>
            </div>
            <ScrollToTop style={{paddingLeft: "6px"}} smooth={true}/>
        </>

    );
}

export default App;
