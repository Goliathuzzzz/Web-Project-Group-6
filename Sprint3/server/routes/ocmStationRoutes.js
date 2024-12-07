const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { maxResults, north, south, east, west } = req.query; //params from frontend?
    const response = await axios.get('https://api.openchargemap.io/v3/poi/', {
      params: {
        output: 'json',
        countrycode: 'FI',
        maxresults: 2000, //due to filtering, this number gets all the chargers in Finland but it's filtered later
        // compact: true,
        verbose: true,
      },
      headers: {
        'X-API-Key': process.env.OPEN_CHARGE_MAP_API_KEY,
      },
    });

    const formattedData = response.data
      .filter((item) =>
        item.Connections?.some(
          (
            connection //filtering out the connection types that are not useful for the project
          ) =>
            [2, 25, 27, 28, 30, 32, 33, 1036].includes(
              connection.ConnectionTypeID
            ) //30, 27 tesla; 32 type1; 33 type2; 2 chademo; 25 type2 socket only; 28 type F slow charge; 1036 type 2 tethered
        )
      )
      .map((item) => ({
        id: item.ID || 'N/A',
        location: {
          title: item.AddressInfo?.Title || 'N/A',
          addressLine1: item.AddressInfo?.AddressLine1 || 'N/A',
          town: item.AddressInfo?.Town || 'N/A',
          postcode: item.AddressInfo?.Postcode || 'N/A',
          latitude: item.AddressInfo?.Latitude || 'N/A',
          longitude: item.AddressInfo?.Longitude || 'N/A',
        },
        usageType: {
          isPayAtLocation: item.UsageType?.IsPayAtLocation || false,
          isMembershipRequired: item.UsageType?.IsMembershipRequired || false,
          isAccessKeyRequired: item.UsageType?.IsAccessKeyRequired || false,
          isPublic: item.UsageType?.Title || false,
        },
        statusType: {
          isOperational: item.StatusType?.IsOperational || false,
          isUserSelectable: item.StatusType?.IsUserSelectable || false,
        },
        isRecentlyVerified: item.IsRecentlyVerified || false,
        dateLastVerified: item.DateLastVerified || 'N/A',
        usageCost: item.UsageCost || 'N/A',
        connections:
          item.Connections?.map((connection) => ({
            id: connection.ID || 'N/A',
            connectionTypeID: connection.ConnectionTypeID || 'N/A',
            powerKW: connection.PowerKW || 'N/A',
            level: connection.LevelID || 'N/A',
            quantity: connection.Quantity || 0,
            isFastChargeCapable: connection.Level?.IsFastChargeCapable || false,
            connectionType: connection.ConnectionType?.Title || 'N/A',
            formalName: connection.ConnectionType?.FormalName || 'N/A',
          })) || [],
      }));
    //for future use, when we want to filter out the stations not currently showing in map view. we can also use distance from the center point
    // .filter((station) => {
    //   const { latitude, longitude } = station.location;
    //   return (
    //     latitude >= parseFloat(south) &&
    //     latitude <= parseFloat(north) &&
    //     longitude >= parseFloat(west) &&
    //     longitude <= parseFloat(east)
    //   );
    // });

    //just for checking in console
    const uniqueStations = [
      ...new Map(
        formattedData.map((item) => [item.location.title, item])
      ).values(),
    ];
    console.log(`Unique Stations: ${uniqueStations.length}`);

    res.json(formattedData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving charging points');
  }
});

router.getById('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const idArray = id.split(',');
    let queryString = '';
    idArray.forEach((id) => {
      queryString += `&id=${id}`;
    });
    const response = await axios.get(
      `https://api.openchargemap.io/v3/poi/?${queryString}`,
      {
        params: {
          output: 'json',
          countrycode: 'FI',
          maxresults: 1, //due to filtering, this number gets all the chargers in Finland but it's filtered later
          // compact: true,
          verbose: true,
        },
        headers: {
          'X-API-Key': process.env.OPEN_CHARGE_MAP_API_KEY,
        },
      });
    const data = response.data;
    console.log(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving charging point');
  }
});

module.exports = router;
