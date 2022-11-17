import React from 'react';

const ButtonAddSong = ({submit}) => {
    return (

            <button className="bg-main text-white active:bg-main-light font-bold uppercase text-base px-8 py-3 rounded shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 cursor-pointer"
                    type="button"
            onClick={submit}>
                Ajouter
            </button>

    );
};

export default ButtonAddSong;