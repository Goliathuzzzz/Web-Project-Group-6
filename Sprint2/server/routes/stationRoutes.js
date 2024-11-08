const express = require('express');
const router = express.Router();
const {
  getAllStations,
  getStationById,
  createStation,
  updateStation,
  deleteStation,
} = require('../controllers/stationController');

// GET /stations
router.get('/', getAllStations);

// POST /stations
router.post('/', createStation);

// GET /stations/:stationId
router.get('/:stationId', getStationById);

// PUT /stations/:stationId
router.put('/:stationId', updateStation);

// DELETE /stations/:stationId
router.delete('/:stationId', deleteStation);

module.exports = router;