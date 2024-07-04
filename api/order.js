const express = require('express');
const router = express.Router()

const Order = require('../models/Order');
const Fruit = require('../models/Fruit');

router.get('/', (req, res) => {
    Order.find()
        .then(orders => res.json(orders))
        .catch(err => console.log(err))
})

router.post('/', (req, res) => {
    const { userId, order } = req.body;

    const newOrder = new Order({
        order: order, userId: userId, 
    })
    
    newOrder.save()
        .then(() => {
            Object.keys(order).forEach(async (fruitName)=>{
                const orderQty = order[fruitName];
                const fruit = await Fruit.findOne({ name: fruitName }); 
                fruit.quantity -= orderQty
                fruit.save();
            })
            res.json({
                message: "Order created",
                userId: userId, 
                order: order,
                success: true,
            })
        })
        .catch(err => res.status(400).json({
            "error": err,
            "message": "Error creating order"
        }))
})
module.exports = router 