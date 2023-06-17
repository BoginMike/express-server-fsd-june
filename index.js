var express = require('express')
var { songRoutes } = require('./apis/songs.js')

var app = express();

app.use(express.json())

app.use("/", songRoutes)

app.get("/", (req, res) => {
    res.send("App working...")
})


app.listen(3001, () => {
    console.log("app started....")
})



