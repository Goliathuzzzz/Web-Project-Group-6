const User = require('../models/userModel');
const mongoose = require('mongoose');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get users' });
  }
};

const createUser = async (req, res) => {
  try {
    const dupeEmails = await User.find({ email: req.body.email });
    if (dupeEmails.length == 0) {
      const newUser = await User.create({ ...req.body });
      res.status(201).json(newUser);
    } else {
      res.status(400).json({ message: "User with this email already exists!" });
    } 
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Failed to create user', error: error.message });
  }
};

const getUserById = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const user = await User.findById(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve user' });
  }
};

// Gets user by email and password (for logging in)
const userLogin = async (req, res) => {
  try {
    const user = await User.findOne({ ...req.body });
    if (user) {
      // res.status(200).json({username: user.username, email: user.email});
      res.status(200).json({username: user.username, email: user.email});
      console.log(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve user' });
  }
};

//find user by id and replace it with new user data
const replaceUser = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const updateUser = await User.findOneAndReplace(
      { _id: userId },
      { ...req.body },
      { new: true }
    );
    if (updateUser) {
      res.status(200).json(updateUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user' });
  }
};

//find user by id and update it with new user data
const updateUser = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const updateUser = await User.findOneAndUpdate(
      { _id: userId },
      { ...req.body },
      { new: true }
    );
    if (updateUser) {
      res.status(200).json(updateUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update user' });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }
  try {
    const deletedUser = await User.findOneAndDelete({ _id: userId });
    if (deletedUser) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete user' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  userLogin,
  createUser,
  replaceUser,
  updateUser,
  deleteUser,
};
