var { Router } = require('express')


const booksRoutes = Router();
var { MongoClient, ObjectId } = require('mongodb')

booksRoutes.get('/', (req, res) => {
    //
    //we will get pageNumber and PageSize from query params

    let pageNumber = Number(req.query.pageNumber)
    let pageSize = req.query.pageSize ? Number(req.query.pageSize) : Number(process.env.PAGE_SIZE || 10)

    let skipCount = (pageNumber - 1) * pageSize
    let limitCount = pageSize

    //mongoDb Query
    const client = new MongoClient("mongodb+srv://admin:123@cluster0.nva7yak.mongodb.net")
    client.connect().then(connection => {
        console.log('connection made')
        const db = connection.db('fsd')
        db.collection('books')
            .aggregate([{ $skip: skipCount }, { $limit: limitCount }])
            .toArray()
            .then(data => {
                return res.json(data)
            })
    })


})




module.exports = { booksRoutes }