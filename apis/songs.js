var { Router } = require('express')
var { uuidv4 } = require('../utilities/utils.js')
const songRoutes = Router();


let data = [{ songName: "At my worst", rating: 5, id: 1 }, { songName: "Attention", rating: 4, id: 2 }]

songRoutes.get('/', (req, res) => {
    res.json(data)
})

songRoutes.post("/", (req, res) => {
    let song = req.body;
    song["id"] = uuidv4()
    data.push(song)
    res.send("Song Created")
})

songRoutes.delete('/', (req, res) => {
    let id = req.query.id;
    //logic to delete song with this id from the array
    data = data.filter(x => x.id != id);

    res.send("Song Deleted")
})

songRoutes.put('/', (req, res) => {
    let id = req.query.id;
    let newSongData = req.body;

    // get the old song and update with new values;
    for (const oldSong of data) {
        if (oldSong.id == id) {
            oldSong.songName = newSongData.songName;
            oldSong.rating = newSongData.rating;
        }
    }

    res.send("resocr updated.")
})


module.exports = { songRoutes }
