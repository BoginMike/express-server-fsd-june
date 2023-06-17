var { Router } = require('express')
const songRoutes = Router();

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

let data = [{ songName: "At my worst", rating: 5, id: 1 }, { songName: "Attention", rating: 4, id: 2 }]

songRoutes.get('/songs', (req, res) => {
    res.json(data)
})

songRoutes.post("/songs", (req, res) => {
    let song = req.body;
    song["id"] = uuidv4()
    data.push(song)
    res.send("Song Created")
})

songRoutes.delete('/songs', (req, res) => {
    let id = req.query.id;
    //logic to delete song with this id from the array
    data = data.filter(x => x.id != id);

    res.send("Song Deleted")
})

songRoutes.put('/songs', (req, res) => {
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
