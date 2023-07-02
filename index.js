var express = require('express')
var jwt = require('jsonwebtoken')
var cors = require('cors')
var dotenv = require('dotenv')
var { songRoutes } = require('./apis/songs.js')
var { recpRoutes } = require('./apis/recipes.js');
const { counterMiddleware } = require('./utilities/counterMiddleware.js');
const { getJsonFromFile } = require('./utilities/utils.js');
const { userRoutes } = require('./apis/users.js');
dotenv.config();
var app = express();

app.use(express.json())
app.use(cors())

function authenticateBasic(req, res, next) {

    if (process.env.AUTH_NEEDED == "true") {
        let username = req.headers.username;
        let password = req.headers.password;

        let allValidUsers = getJsonFromFile('./users.json')

        if (allValidUsers.find(x => x.username == username && x.password == password)) {
            next(); // valid user
        }
        else {
            res.json({ message: "request not authorized" })
            return;
        }

    } else {
        next();
    }


}


function autheticate(req, res, next) {
    if (process.env.AUTH_NEEDED == "true") {
        let token = req.headers.token;
        try {
            jwt.verify(token, process.env.SECRET_KEY)
            next();

        } catch (error) {
            res.json({ message: "Unauthorized Request", status: false })
            return;
        }

    } else {
        next();
    }
}

app.use("/users", userRoutes)
app.use("/songs", autheticate, counterMiddleware, songRoutes)
app.use("/recipes", autheticate, recpRoutes)

app.get("/", (req, res) => {
    res.send("App working...")
})


app.listen(3001, () => {
    console.log("app started....")
})



