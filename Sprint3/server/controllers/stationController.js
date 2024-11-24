const Station = require('../models/stationModel');
const mongoose = require('mongoose');

const getAllStations = async (req, res) => {
  try {
    const stations = await Station.find({}).sort({ createdAt: -1 });
    res.status(200).json(stations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get stations' });
  }
};

const createStation = async (req, res) => {
  try {
    const newStation = await Station.create({ ...req.body });
    res.status(201).json(newStation);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Failed to create station', error: error.message });
  }
};

const getStationById = async (req, res) => {
  const { stationId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(stationId)) {
    return res.status(400).json({ message: 'Invalid station ID' });
  }

  try {
    const station = await Station.findById(stationId);
    if (station) {
      res.status(200).json(station);
    } else {
      res.status(404).json({ message: 'Station not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve station' });
  }
};

// Custom search for map filters and search bar
const customSearch = async (req, res) => {
  const { location, availability, connectors, provider, power } = req.query;
  console.log(connectors);

  try {
    const query = {};
    if (connectors) {
      query.connectors = { $in: connectors };
      console.log(query);
    }
    if (power) {
      query.power = { $gte: power };
    }

    const stations = await Station.find(query);
    res.status(200).json(stations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to search stations' });
  }
};

//find station by id and replace it with new station data
const replaceStation = async (req, res) => {
  const { stationId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(stationId)) {
    return res.status(400).json({ message: 'Invalid station ID' });
  }

  try {
    const replaceStation = await Station.findOneAndReplace(
      { _id: stationId },
      { ...req.body },
      { new: true }
    );
    if (replaceStation) {
      res.status(200).json(replaceStation);
    } else {
      res.status(404).json({ message: 'Station not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update station' });
  }
};

//find station by id and update it with new station data
const updateStation = async (req, res) => {
  const { stationId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(stationId)) {
    return res.status(400).json({ message: 'Invalid station ID' });
  }

  try {
    const replaceStation = await Station.findOneAndUpdate(
      { _id: stationId },
      { ...req.body },
      { new: true }
    );
    if (replaceStation) {
      res.status(200).json(replaceStation);
    } else {
      res.status(404).json({ message: 'Station not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update station' });
  }
};

const deleteStation = async (req, res) => {
  const { stationId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(stationId)) {
    return res.status(400).json({ message: 'Invalid station ID' });
  }
  try {
    const deletedStation = await Station.findOneAndDelete({ _id: stationId });
    if (deletedStation) {
      res.status(200).json({ message: 'Station deleted successfully' });
    } else {
      res.status(404).json({ message: 'Station not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete station' });
  }
};

module.exports = {
  getAllStations,
  getStationById,
  customSearch,
  createStation,
  replaceStation,
  updateStation,
  deleteStation,
};
