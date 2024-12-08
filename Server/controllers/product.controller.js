const Product = require("../models/product.model.js");

const createProduct = async (req, res) => {
    try {
        const categories = req.body.categories
            ? req.body.categories.split(',')
            : [];
        const newProduct = new Product({
            ...req.body,
            categories : categories,
            image: req.file.path, // Use the uploaded file's path
        });

        const savedProduct = await newProduct.save(); // Save to the database

        res.status(201).json({
            message: "Product created successfully",
            data: savedProduct,
        });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({
            message: "Error creating product",
            error: error.message,
        });
    }
};


const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true,
        });
        res.status(200).json({
            message: "Product updated successfully",
            data: updatedProduct,

        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error updating product",
            error: err.message
        })

    }
}

const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Product Deleted successfully",

        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error Deleting product",
            error: err.message
        })

    }
}


const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id); // Corrected params

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.status(200).json({
            message: "Product found",
            data: product,
        });
    } catch (err) {
        console.error("Error fetching product:", err);
        res.status(500).json({
            message: "Error fetching product",
            error: err.message,
        });
    }
};


const getAllProduct = async (req, res) => {
    try {
        const qlatest = req.query.latest;
        const qcategories = req.query.latest;

        let product;

        if (qlatest) {
            product = await Product.find().sort({ createdAt: -1 }).limit(3);
        } else if (qcategories) {
            product = await Product.find({
                categories: { $in: [qcategories] }
            })
        } else {
            product = await Product.find();
        }
        res.status(200).json({
            message: "Products found",
            data: product
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
    createProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getAllProduct

};

