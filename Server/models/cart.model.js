const mongoose = require('mongoose')
const { Schema } = mongoose;

const cartModel = new Schema({
    userId: {
        type: String,
        required: true,
    },
    product: [
        {
            prdductId: {
                type: String,
            },
            quantity: {
                type: Number,
                default: 1,
            }
        }
    ],

}, {
    timestamps: true,
}
)

module.exports = mongoose.model("Cart", cartModel)