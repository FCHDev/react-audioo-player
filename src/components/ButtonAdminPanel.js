import React from 'react';

const ButtonAdminPanel = ({admin, setAdmin}) => {
    return (

        <button className="
        text-white
        w-44
        md:absolute
        top-2
        left-2
        mx-auto
        bg-main
        font-bold
        uppercase
        text-base
        px-8
        py-3
        rounded
        shadow-md
        hover:shadow-lg
        outline-none
        focus:outline-none
        mr-1
        mb-1
        ease-linear
        transition-all
        duration-150
        cursor-pointer"
                type="button"
                id="admin-panel"
                onClick={() => setAdmin(!admin)}>
            Admin Panel
        </button>

    );
};

export default ButtonAdminPanel;