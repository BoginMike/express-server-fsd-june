var { Router } = require('express')
var { uuidv4, getJsonFromFile, pushJsonToFile, writeJsonToFile, deleteFromJsonFile } = require('../utilities/utils.js');
const { counterMiddleware } = require('../utilities/counterMiddleware.js');
const songRoutes = Router();


function middleware2(req, res, next) {

    console.log("middleware 2 executed....")

    next();
}

function attachSystemTime(req, res, next) {
    res.setHeader('SagarServerDate', new Date())
    next()
}

songRoutes.get('/', attachSystemTime, (req, res) => {
    let data = getJsonFromFile('./songs.json')
    res.json(data)
})

songRoutes.post("/", (req, res) => {
    let song = req.body;
    song["id"] = uuidv4()
    pushJsonToFile('./songs.json', song)
    res.send("Song Created")
})

songRoutes.delete('/', (req, res) => {
    let id = req.query.id;
    //logic to delete song with this id from the array
    deleteFromJsonFile('./songs.json', id)
    res.send("Song Deleted")
})

songRoutes.put('/', (req, res) => {
    let id = req.query.id;
    let newSongData = req.body;

    // get the old song and update with new values;
    let data = getJsonFromFile('./songs.json')
    for (const oldSong of data) {
        if (oldSong.id == id) {
            oldSong.songName = newSongData.songName;
            oldSong.rating = newSongData.rating;
        }
    }
    writeJsonToFile('./songs.json', data)


    res.send("resocr updated.")
})


module.exports = { songRoutes }
