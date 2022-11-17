import React, {useState} from 'react';
import {useRef} from "react";

const VolumeModule = ({currentTrack, volume}) => {
    const volumeRef = useRef()
    const [volumeProgress, setVolumeProgress] = useState(volume)


    const volumeWidth = (e) => {
        const progress = e.target.value/100
        currentTrack.volume = progress
        setVolumeProgress(progress)
    }

    return (
        <div className="mt-5 flex" id="volume">
            <label htmlFor="default-range"
                   className="mt-1 mr-4 block text-sm font-medium text-main font-bold">{(volumeProgress*100).toFixed(0)}%</label>
            <input id="default-range" type="range"
                   defaultValue={70}
                   className="mt-3 w-full h-1 bg-main-light rounded-lg appearance-none cursor-pointer thumb"
                   ref={volumeRef}
                   onChange={volumeWidth}/>
        </div>
    );
};

export default VolumeModule;