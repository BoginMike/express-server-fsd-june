var { Router } = require('express')
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
})


module.exports = { userRoutes }
