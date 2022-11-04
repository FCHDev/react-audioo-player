// COVERS IMPORTS
import pink from "../img/pink.jpg"
import subtil from "../img/subtil.jpg"
import oxia from "../img/oxia.jpg"


// SOUNDS IMPORTS
import the_sky_was_pink from "../sounds/Nathan Fake - The Sky Was Pink (James Holden remix).mp3"
import subtil_sound from "../sounds/Joris Delacroix - Subtil.mp3"
import domino from "../sounds/Oxia - Domino.mp3"


export const playlist = [
    {
        "artist": "Nathan Fake",
        "title": "The Sky Was Pink (James Holden)",
        "cover": pink,
        "sound": new Audio(the_sky_was_pink)
    },
    {
        "artist": "Joris Delacroix",
        "title": "Subtil",
        "cover": subtil,
        "sound": new Audio(subtil_sound)
    },
    {
        "artist": "Oxia",
        "title": "Domino",
        "cover": oxia,
        "sound": new Audio(domino)
    }
]