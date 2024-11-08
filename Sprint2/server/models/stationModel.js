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

  if (
    !name ||
    !location ||
    !coordinates ||
    !connectors ||
    !availability ||
    !provider
  ) {
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

function updateOneById(id, updatedData) {
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
    stationArray = stationArray.filter((station) => station.id !== Number(id));
    return stationArray.length < initialLength;
  }
  return false;
}

if (require.main === module) {
  // Add station
  let result = addOne({
    name: 'Station X',
    location: 'Helsinki',
    coordinates: {
      latitude: 60.1699,
      longitude: 24.9355,
    },
    connectors: ['CHAdeMO', 'CCS'],
    availability: 'Occupied',
    provider: 'Virta',
  });
  console.log('addOne called: ', result);

  // Get all stations
  const allStations = getAll();
  console.log('getAll called: ', allStations);

  // Find by id
  const station = findById(1);
  console.log('findById called: ', station);

  // Update by id
  const updatedStation = updateOneById(1, { name: 'Station HEBU' });
  console.log('updateOneById called: ', updatedStation);

  // Delete by id
  const deletedStation = deleteOneById(1);
  console.log('deleteOneById called: ', deletedStation);
}

const Station = {
  getAll,
  addOne,
  findById,
  updateOneById,
  deleteOneById,
};

module.exports = Station;
