const houses = require('./db.json')

let newHouseId = 4;

module.exports = {
    getHouses: (req,res) => {
        res.status(200).send(houses);
    },

    deleteHouse: (req,res) => {
        index = houses.findIndex(elem => elem.id === +req.params.id)
        houses.splice(index, 1);
        res.status(200).send(houses)
    },

    createHouse: (req,res) => {
        const { address, price, imageURL } = req.body;
        const newHouse = {
            id : newHouseId,
            address,
            price : +price,
            imageURL
        }
        console.log(newHouseId);
        newHouseId++;
        houses.push(newHouse);
        res.status(200).send(houses);
    },

    updateHouse: (req,res) => {
        const index = houses.findIndex(elem => elem.id === +req.params.id);
        if (houses[index].price + (req.body.type === 'plus' ? 10000 : -10000) < 0) {
            res.status(400).send("Cannot decrement any further.")
        } else {
            houses[index].price += req.body.type === 'plus' ? 10000 : -10000;
            res.status(200).send(houses)
        }
    }
}