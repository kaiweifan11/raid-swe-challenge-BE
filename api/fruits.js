const express = require('express');
const router = express.Router()

const Fruit = require('../models/Fruit');

router.get('/', (req, res) => {
    Fruit.find()
        .then(fruits => res.json(fruits))
        .catch(err => console.log(err))
})

router.post('/', (req, res) => {
    const { name, price, quantity } = req.body;
    const newFruit = new Fruit({
        name: name, price: price, quantity: quantity
    })
    
    newFruit.save()
        .then(() => res.json({
            message: "Fruit created",
            name: name, 
            price: price, 
            quantity: quantity
        }))
        .catch(err => res.status(400).json({
            "error": err,
            "message": "Error creating fruit"
        }))
})
module.exports = router 