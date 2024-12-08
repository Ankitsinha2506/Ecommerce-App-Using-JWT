const User = require("../models/user.model.js");


const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body

            },
            {
                new: true
            }
        );
        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        res.status(200).json({
            message: "User updated successfully",
            data: updatedUser,
        })


    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error updating user",
            error: err,
        })

    }
}

const deleteUser = async (req, res) => {
    try {
        await User.findOneAndDelete(req.params.id);
        res.status(200).json({
            message: "User deleted successfully",
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error deleting user",
        })


    }
}

const getAdmin = async (req, res) => {
    try {
        const admin = await User.findById(req.params.id);
        if (!admin) {
            return res.status(404).json({
                message: "Admin not found"
            })
        }

        const { password, ...info } = admin._doc;

        res.status(200).json({
            message: "Admin found",
            data: info
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error finding admin",
            error: err
        })
    }
}

const getAllUsers = async (req, res) => {
    const query = req.query.latest;
    try {
        const users = query ? await User.find().sort({ _id: -1 }).limit(3) : await User.find();
        // const users = await User.find();
        res.status(200).json({
            message: "users found",
            data: users
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error finding users",
            error: err
        })
    }
}

const getUserStats = async (req, res) => {
    try {
        const date = new Date();
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

        const userStats = await User.aggregate([
            {
                $match: { createdAt: { $gte: lastYear } }
            },
            {
                $project: {
                    month: { $month: "$createdAt" },

                }
            },
            {
                $group: {
                    _id: "$month",
                    "total": { $sum: 1 }
                }

            }

        ])
        res.status(200).json({
            message: "user stats found",
            data: userStats
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "An error occurred aquring User Statistics.",
            error: err.message
        })

    }
}


module.exports = {
    updateUser,
    deleteUser,
    getAdmin,
    getAllUsers,
    getUserStats,
}
