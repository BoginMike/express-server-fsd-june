var express = require('express')
var { songRoutes } = require('./apis/songs.js')
var { recpRoutes } = require('./apis/recipes.js');
const { counterMiddleware } = require('./utilities/counterMiddleware.js');

var app = express();

app.use(express.json())

app.use("/songs",counterMiddleware ,songRoutes)
app.use("/recipes", recpRoutes)

app.get("/", (req, res) => {
    res.send("App working...")
})


app.listen(3001, () => {
    console.log("app started....")
})



