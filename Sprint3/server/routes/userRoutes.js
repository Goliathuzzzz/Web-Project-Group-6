const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userAuth = require('../middleware/userAuth');
const {
  getAllUsers,
  getUserById,
  createUser,
  replaceUser,
  updateUser,
  deleteUser,
  userLogin,
} = require('../controllers/userController');

// For user routes that don't require auth

// POST /users (registration)
router.post('/',createUser);

// GET /users/login (logging in)
router.post('/login', userLogin)

//custom middleware for authentication
router.use(auth);

// GET /users
router.get('/', getAllUsers);

// GET /users/:stationId
router.get('/:userId', getUserById);

// PUT /users/:stationId
router.put('/:userId', updateUser);

// PATCH /users/:stationId
router.patch('/:userId', replaceUser);

// DELETE /users/:stationId
router.delete('/:userId', deleteUser);

module.exports = router;