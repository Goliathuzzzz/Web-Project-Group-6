const Station = require('../models/stationModel');

const getAllStations = (req, res) => {
  const stations = Station.getAll();
  res.status(200).json(stations);
};

const createStation = (req, res) => {
  const newStation = Station.addOne({ ...req.body });

  if (newStation) {
    res.status(201).json(newStation);
  } else {
    res.status(500).json({ message: 'Failed to create station' });
  }
};

const getStationById = (req, res) => {
  const stationId = req.params.stationId;
  const station = Station.findById(stationId);
  if (station) {
    res.status(200).json(station);
  } else {
    res.status(404).json({ message: 'Station not found' });
  }
};

const updateStation = (req, res) => {
  const stationId = req.params.stationId;
  const updatedStation = Station.updateOneById(stationId, { ...req.body });

  if (updatedStation) {
    res.status(200).json(updatedStation);
  } else {
    res.status(404).json({ message: 'Station not found' });
  }
};

const deleteStation = (req, res) => {
  const stationId = req.params.stationId;
  const isDeleted = Station.deleteOneById(stationId);

  if (isDeleted) {
    res.status(200).json({ message: 'Station deleted successfully' });
  } else {
    res.status(404).json({ message: 'Station not found' });
  }
};

module.exports = {
  getAllStations,
  getStationById,
  createStation,
  updateStation,
  deleteStation,
};
