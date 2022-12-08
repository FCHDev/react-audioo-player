import React from 'react';

import {BsFillSkipStartFill} from "react-icons/bs";
import {BsFillPlayCircleFill} from "react-icons/bs";
import {BsFillPauseCircleFill} from "react-icons/bs";
import {BsFillSkipEndFill} from "react-icons/bs";
import {BsStopCircleFill} from "react-icons/bs";

const ControlPanel = ({play, pause, stop, isPlaying, forward, rewind, tracks, id}) => {
    const playIcon =
        <BsFillPlayCircleFill
            className="md:w-14 md:h-14 sm:w-20 sm:h-20 cursor-pointer text-main box-shadow4 rounded-full"
            onClick={play}
/>

    const pauseIcon =
        <BsFillPauseCircleFill
            className="md:w-14 md:h-14 sm:w-20 sm:h-20 cursor-pointer text-main box-shadow4 rounded-full"
            onClick={pause}/>

    return (
        <div className="flex justify-evenly w-full pl-0 my-5 md:mt-3 md:mb-4 ">

            {id === 0
                ? <BsFillSkipStartFill className="w-12 h-12 text-main-light"/>
                : <BsFillSkipStartFill className="w-12 h-12 cursor-pointer" onClick={rewind}/>}
            {isPlaying ? pauseIcon : playIcon}
            <BsStopCircleFill className="md:w-14 md:h-14 sm:w-20 sm:h-20 cursor-pointer box-shadow4 rounded-full
            hover:origin-top
            transition-all[200ms]" onClick={stop}/>
            {id + 1 === tracks.length
                ? <BsFillSkipEndFill className="w-12 h-12 text-main-light"/>
                : <BsFillSkipEndFill className="w-12 h-12 cursor-pointer" onClick={forward}/>}

        </div>
    );
};

export default ControlPanel;