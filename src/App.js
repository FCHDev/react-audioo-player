import ControlPanel from "./components/ControlPanel";
import {playlist} from "./assets/datas/playlist.js"
import React, {useEffect, useRef, useState} from "react";
import VolumeModule from "./components/VolumeModule";
import convertSecondstoTime from "./functions/convertSecondsToTime";


function App() {

    const [id, setId] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTrack, setCurrentTrack] = useState(playlist[0].sound)
    const totalDuration = currentTrack.duration
    const [completed, setCompleted] = useState(0)
    const [secondsCount, setSecondsCount] = useState(parseInt((currentTrack.currentTime).toFixed(0)))
    const [volume, setVolume] = useState(0.8)


    const progressBar = useRef()


    const checkWidth = (e) => {
        let width = progressBar.current.clientWidth;
        const offset = e.nativeEvent.offsetX
        const progress = offset / width * 100
        currentTrack.currentTime = progress / 100 * currentTrack.duration
        setSecondsCount(currentTrack.currentTime)
        setCompleted(progress)
    }


    const handlePlay = () => {
        currentTrack.play()
        setIsPlaying(true)
    }
    const handlePause = () => {
        currentTrack.pause()
        setIsPlaying(false)
    }
    const handleStop = () => {
        handlePause()
        setSecondsCount(0)
        currentTrack.currentTime = 0;
        setCompleted(0)
    }
    const handleRewind = () => {
        setId(id - 1)
        setIsPlaying(true)
        currentTrack.pause()
        setCurrentTrack(playlist[id - 1].sound)
        setSecondsCount(0)
        setCompleted(0)
        setVolume(currentTrack.volume)
        playlist[id - 1].sound.currentTime = 0
        playlist[id - 1].sound.play()
    }
    const handleForward = () => {
        setId(id + 1)
        setIsPlaying(true)
        currentTrack.pause()
        setCurrentTrack(playlist[id + 1].sound)
        setSecondsCount(0)
        setCompleted(0)
        setVolume(currentTrack.volume)
        playlist[id + 1].sound.currentTime = 0
        playlist[id + 1].sound.play()
    }


    useEffect(() => {
        const progressValue = currentTrack.currentTime / totalDuration * 100
        const interval = setInterval(() => {
            setCompleted(progressValue);
            isPlaying ? setSecondsCount(secondsCount + 1) : setSecondsCount(secondsCount)
        }, 1000);
        return () => clearInterval(interval);
    }, [currentTrack.currentTime, totalDuration, isPlaying, secondsCount]);



    return (

        <div className="sm:h-screen max-w-md mx-auto bg-white md:rounded-xl md:h-auto shadow-md overflow-hidden md:max-w-2xl grid place-items-center">
            <div className="h-full w-full md:flex">
                <div className=" md:shrink-0">
                    <img className="sm:h-full w-full object-cover md:h-full md:w-60 sm:w-full" src={playlist[id].cover}
                         alt={playlist[id].artist}
                         // onClick={() => {
                         //     console.log(
                         //         parseInt((currentTrack.currentTime / totalDuration * 100).toFixed(0)) + "%  Track ID : " + currentTrack.currentSrc)
                         // }}
                    />
                </div>
                <div className="md:h-full md:w-full p-8">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{playlist[id].artist}</div>
                    <div className="block mt-1 text-lg leading-tight font-medium text-black">{playlist[id].title}</div>

                    {/*PROGRESS BAR*/}
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 my-5 cursor-pointer"
                         ref={progressBar}
                         onClick={checkWidth}>
                        <div className="bg-indigo-500 h-2.5 rounded-full"
                             style={{width: `${completed}%`}}
                        ></div>
                    </div>
                    {/*TIME PANEL*/}
                    <div className="font-mono">{convertSecondstoTime(secondsCount)}</div>

                    {/*CONTROL PANEL*/}
                    <ControlPanel
                        play={handlePlay}
                        pause={handlePause}
                        stop={handleStop}
                        rewind={handleRewind}
                        forward={handleForward}
                        isPlaying={isPlaying}/>


                    {/*VOLUME BAR*/}
                    <VolumeModule currentTrack={currentTrack} volume={volume} setVolume={setVolume}/>

                </div>
            </div>
        </div>

    );
}

export default App;
