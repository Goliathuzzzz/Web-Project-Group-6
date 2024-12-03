const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  getAllStations,
  getStationById,
  createStation,
  replaceStation,
  updateStation,
  deleteStation,
} = require('../controllers/stationController');

//used with mockdata
// GET /stations
router.get('/', getAllStations);

//custom middleware for authentication
router.use(auth);

// POST /stations
router.post('/', createStation);

// GET /stations/:stationId
router.get('/:stationId', getStationById);

// PUT /stations/:stationId
router.put('/:stationId', updateStation);

// PATCH /stations/:stationId
router.patch('/:stationId', replaceStation);

// DELETE /stations/:stationId
router.delete('/:stationId', deleteStation);

module.exports = router;