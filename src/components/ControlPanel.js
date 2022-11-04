import React from 'react';

import {BsFillSkipStartFill} from "react-icons/bs";
import {BsFillPlayCircleFill} from "react-icons/bs";
import {BsFillPauseCircleFill} from "react-icons/bs";
import {BsFillSkipEndFill} from "react-icons/bs";
import {BsStopCircleFill} from "react-icons/bs";

const ControlPanel = ({play, pause, stop, isPlaying, forward, rewind}) => {
    const playIcon = <BsFillPlayCircleFill className="w-12 h-12 cursor-pointer text-indigo-600" onClick={play} height="2em" width="2em"/>

    const pauseIcon = <BsFillPauseCircleFill className="w-12 h-12 cursor-pointer text-indigo-600" onClick={pause}/>


    return (
        <div className="flex justify-evenly w-full pl-0 mt-3">

            <BsFillSkipStartFill className="w-10 h-10 cursor-pointer" onClick={rewind}/>
            {isPlaying ? pauseIcon : playIcon}
            <BsStopCircleFill className="w-12 h-12 cursor-pointer" onClick={stop}/>
            <BsFillSkipEndFill className="w-10 h-10 cursor-pointer" onClick={forward}/>

        </div>
    );
};

export default ControlPanel;