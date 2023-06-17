var { Router } = require('express')
var { uuidv4 } = require('../utilities/utils.js')
const recpRoutes = Router();


let data = []

recpRoutes.get('/', (req, res) => {
    res.json(data)
})

recpRoutes.post("/", (req, res) => {
    let recipe = req.body;
    recipe["id"] = uuidv4()
    data.push(recipe)
    res.send("recipe Created")
})

recpRoutes.delete('/', (req, res) => {
    let id = req.query.id;
    //logic to delete recipe with this id from the array
    data = data.filter(x => x.id != id);

    res.send("recipe Deleted")
})

recpRoutes.put('/', (req, res) => {
    let id = req.query.id;
    let newData = req.body;

    // get the old recipe and update with new values;
    for (const oldrecipe of data) {
        if (oldrecipe.id == id) {
            oldrecipe.recipeName = newData.recipeName;
            oldrecipe.description = newData.description;
        }
    }

    res.send("recipe updated.")
})


module.exports = { recpRoutes }
