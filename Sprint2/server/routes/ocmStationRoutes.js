const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { maxResults } = req.query; //params from frontend?
        const response = await axios.get('https://api.openchargemap.io/v3/poi/', {
            params: {
                output: 'json',
                countrycode: 'FI',
                maxresults: maxResults,
                compact: true,
                verbose: false,
            },
            headers: {
                'X-API-Key': process.env.OPEN_CHARGE_MAP_API_KEY,
            },
        });

        //what data?
        const formattedData = response.data.map(item => ({
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
            },
            statusType: {
                isOperational: item.StatusType?.IsOperational || false,
                isUserSelectable: item.StatusType?.IsUserSelectable || false,
            },
            isRecentlyVerified: item.IsRecentlyVerified || false,
            dateLastVerified: item.DateLastVerified || 'N/A',
        }));

        res.json(formattedData);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving charging points');
    }
});

module.exports = router;

// tooodooooo:
// "Connections":
//         {
//           "ID": 307235,
//           "ConnectionTypeID": 25,
//           "ConnectionType": {
//             "FormalName": "IEC 62196-2 Type 2",
//             "IsDiscontinued": false,
//             "IsObsolete": false,
//             "ID": 25,
//             "description": "Type 2 (Socket Only)"
//           },
//           "Reference": null,
//           "StatusTypeID": 50,
//           "StatusType": {
//             "IsOperational": true,
//             "IsUserSelectable": true,
//             "ID": 50,
//             "description": "Operational"
//           },
//           "LevelID": 2,
//           "Level": {
//             "Comments": "Over 2 kW, usually non-domestic socket type",
//             "IsFastChargeCapable": false,
//             "ID": 2,
//             "description": "Level 2 : Medium (Over 2kW)"
//           },
//           "Amps": null,
//           "Voltage": null,
//           "PowerKW": 22,
//           "CurrentTypeID": 20,
//           "CurrentType": {
//             "Description": "Alternating Current - Three Phase",
//             "ID": 20,
//             "description": "AC (Three-Phase)"
//           },
//           "Quantity": 3,
//           "Comments": null
//         },       "NumberOfPoints": 4,
//         "GeneralComments": null,
//         "DatePlanned": null,
//         "DateLastConfirmed": null,
//         "StatusTypeID": 50,
//         "DateLastStatusUpdate": "2021-11-07T16:36:00Z",
//         "MetadataValues": null,
//         "DataQualityLevel": 1,
//         "DateCreated": "2021-11-07T16:36:00Z",
//         "SubmissionStatusTypeID": 200
//       },