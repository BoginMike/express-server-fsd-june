var { Router } = require('express')
var jwt = require('jsonwebtoken');
const { MongoClient, ObjectId } = require('mongodb');
const userRoutes = Router();

userRoutes.post('/', (req, res) => {
    let userObj = req.body;

    // store user in mongodb
    const client = new MongoClient(process.env.DB_CONNECTION_STRING)
    client.connect().then(connection => {
        console.log('connection made')
        const db = connection.db('fsd')
        db.collection('users')
            .insertOne(userObj)
            .then(x => {
                // 
                if (x.acknowledged) {
                    res.send("User Created")
                } else {
                    res.send("Something went wrong")
                }
            })
    })

});



userRoutes.patch('/', (req, res) => {
    let { _id, ...newFields } = req.body;

    const client = new MongoClient(process.env.DB_CONNECTION_STRING)
    client.connect().then(connection => {
        console.log('connection made')
        const db = connection.db('fsd')
        db.collection('users')
            .updateOne({ _id: new ObjectId(_id) }, { $set: newFields })
            .then(x => {
                // 
                if (x.acknowledged) {
                    res.send("User Updated")
                } else {
                    res.send("Something went wrong")
                }
            })
    })

})


userRoutes.get('/generate-token', (req, res) => {

    let username = req.headers.username;
    let password = req.headers.password;


    const client = new MongoClient(process.env.DB_CONNECTION_STRING)
    client.connect().then(connection => {
        console.log('connection made')
        const db = connection.db('fsd')
        db.collection('users')
            .find({ username: username, password: password })
            .toArray()
            .then(data => {
                if (data && data.length > 0) {

                    let token = jwt.sign({ username }, process.env.SECRET_KEY, {
                        expiresIn: process.env.TOKEN_EXPIRES_IN
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
    })




})


module.exports = { userRoutes }
