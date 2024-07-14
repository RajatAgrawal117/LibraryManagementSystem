const User = require('../models/User');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude passwords
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred while fetching users");
    }
};

module.exports = { getAllUsers };
