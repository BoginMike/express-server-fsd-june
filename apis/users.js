var { Router } = require('express')
var jwt = require('jsonwebtoken')
var { uuidv4, pushJsonToFile, getJsonFromFile } = require('../utilities/utils.js');
const userRoutes = Router();

userRoutes.post('/', (req, res) => {
    let userObj = req.body;

    let prevUsers = getJsonFromFile('./users.json')
    if (prevUsers.find(x => x.username.toLowerCase() == userObj.username.toLowerCase())) {
        res.send("User already exists!!")
        return
    }


    userObj['id'] = uuidv4();
    pushJsonToFile('./users.json', userObj)
    res.send("User Created")
});


userRoutes.get('/generate-token', (req, res) => {

    let username = req.headers.username;
    let password = req.headers.password;

    let allValidUsers = getJsonFromFile('./users.json')

    if (allValidUsers.find(x => x.username == username && x.password == password)) {

        let token = jwt.sign({ username }, process.env.SECRET_KEY, {
            expiresIn: "30m"
        })

        res.json({
            token: token
        })
    } else {
        res.json({
            token: ""
        })
    }
})


module.exports = { userRoutes }
