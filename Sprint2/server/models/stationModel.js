const mockData = require('../mock-data/ev_stations_mock_data.json');

// Data model
// {
// "id": 2,
// "name": "Station B",
// "location": "Espoo",
// "coordinates": {
//      "latitude": 60.2055,
//      "longitude": 24.6559
// },
// "connectors": [
//     "CHAdeMO",
//     "CCS"],
// "availability": "Occupied",
// "provider": "Fortum"
// }

let stationArray = mockData;
let nextId =
  stationArray.length > 0
    ? Math.max(...stationArray.map((station) => station.id)) + 1
    : 100;

function getAll() {
  return stationArray;
}

function addOne(stationData) {
  const { name, location, coordinates, connectors, availability, provider } =
    stationData;

  if (!name || !location || !coordinates || !connectors || !availability || !provider) {
    return false;
  }

  const newStation = {
    id: nextId++,
    ...stationData,
  };

  stationArray.push(newStation);
  return newStation;
}

function findById(id) {
  const numericId = parseInt(id);
  const item = stationArray.find((station) => station.id === numericId);
  return item || false;
}

function UpdateOneById(id, updatedData) {
  const station = findById(id);
  if (station) {
    Object.assign(station, updatedData);
    return station;
  }
  return false;
}

function deleteOneById(id) {
  const item = findById(id);
  if (item) {
    const initialLength = stationArray.length;
    stationArray = stationArray.filter(
      (station) => station.id !== ParseInt(id)
    );
    return stationArray.length < initialLength;
  }
  return false;
}

const Station = {
  getAll,
  addOne,
  findById,
  UpdateOneById,
  deleteOneById,
};

module.exports = Station;