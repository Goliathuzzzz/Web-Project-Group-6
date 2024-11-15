const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

// GET /users
router.get('/', getAllUsers);

//custom middleware for authentication
router.use(auth);

// POST /users
router.post('/', createUser);

// GET /users/:stationId
router.get('/:userId', getUserById);

// PUT /users/:stationId
router.put('/:userId', updateUser);

// DELETE /users/:stationId
router.delete('/:userId', deleteUser);

module.exports = router;