const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    order: {
        type: Object,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
})
module.exports = mongoose.model("Order", orderSchema, "orders")