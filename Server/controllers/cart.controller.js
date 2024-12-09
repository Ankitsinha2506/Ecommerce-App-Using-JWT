const Cart = require("../models/cart.model.js");

const createCart = async (req, res) => {
    try {
        const newCart = new Cart(req.body);
        await newCart.save();
        res.status(201).json({
            message: "Cart created successfully",
            data: newCart,
        });
    } catch (error) {
        console.error("Error creating Cart:", error);
        res.status(500).json({
            message: "Error creating Cart",
            error: error.message,
        });
    }
};


const updateCart = async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true,
        });
        res.status(200).json({
            message: "Cart updated successfully",
            data: updatedCart,

        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error updating Cart",
            error: err.message
        })

    }
}

const deleteCart = async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Cart Deleted successfully",

        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error Deleting Cart",
            error: err.message
        })

    }
}


const getCartItem = async (req, res) => {
    try {
        const cartItem = await Cart.findById(req.params.id); // Corrected params

        if (!Cart) {
            return res.status(404).json({
                message: "Cart not found",
            });
        }

        res.status(200).json({
            message: "Cart found",
            data: cartItem,
        });
    } catch (err) {
        console.error("Error fetching Cart:", err);
        res.status(500).json({
            message: "Error fetching Cart",
            error: err.message,
        });
    }
};


const getAllCartItems = async (req, res) => {
    try {
        const cartItems = await Cart.find();
        res.status(200).json({
            message: "Products found",
            data: cartItems,
        })


    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error fetching products",
            error: err.message
        })

    }
}

module.exports = {
    createCart,
    updateCart,
    deleteCart,
    getCartItem,
    getAllCartItems

};

