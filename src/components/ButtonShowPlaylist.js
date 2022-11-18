import React from 'react';
import { Link } from 'react-scroll'

const ButtonShowPlaylist = () => {
    return (
        <div className="flex justify-center sm:mb-3">
            <button className="
                bg-main
                text-white
                w-56
                font-bold
                uppercase
                text-base
                px-8
                py-4
                mb-3
                rounded
                outline-none
                focus:outline-none
                ease-linear
                transition-all
                duration-150"
                            type="button"
                            id="show-playlist"
                            >
                <Link activeClass="active" to="playlist" spy={true} smooth={true} offset={50} duration={500}>
                    Show Playlist
                </Link>
            </button>
        </div>
    );
};

export default ButtonShowPlaylist;