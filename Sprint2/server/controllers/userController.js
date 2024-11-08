const User = require('../models/userModel');

const getAllUsers = (req, res) => {
    const users = User.getAll();
    res.status(200).json(users);
};

const createUser = (req, res) => {
    const newUser = User.addOne({ ...req.body });

    if (newUser) {
        res.status(201).json(newUser);
    } else {
        res.status(500).json({ message: 'Failed to create user' });
    }
};

const getUserById = (req, res) => {
    const userId = req.params.userId;
    const user = User.findById(userId);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

const updateUser = (req, res) => {
    const userId = req.params.userId;
    const updatedUser = User.updateOneById(userId, { ...req.body });

    if (updatedUser) {
        res.status(200).json(updatedUser);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

const deleteUser = (req, res) => {
    const userId = req.params.userId;
    const isDeleted = User.deleteOneById(userId);

    if (isDeleted) {
        res.status(204).json({ message: 'User deleted successfully' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};