# Self-Assessment

### Seed Script

To simulate the future API usage, we decided to persist the mock-data to the database. This is currently achieved by running the `seedstations.js` script with Node.js. In the future, this process will be replaced by dynamically fetching data from an external API instead of relying on our database.

```js
const mongoose = require('mongoose');
const Station = require('../models/stationModel');
const fs = require('fs'); //file system module to read json
require('dotenv').config({ path: '../.env' });
console.log(process.env.MONGO_URI);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    //read station data from JSON file
    const stationsData = JSON.parse(
      fs.readFileSync('./ev_stations_mock_data.json', 'utf8')
    );

    //insert data into the database
    const result = await Station.insertMany(stationsData);
    console.log('Stations inserted:', result);

    mongoose.connection.close(); //close connection after insertion
  } catch (error) {
    console.error(error);
    mongoose.connection.close();
  }
};
```

### Delete script

There is also `deletestations.js` file to empty the database of stations.

```js
const mongoose = require('mongoose');
const Station = require('../models/stationModel');
require('dotenv').config({ path: '../.env' });

const clearCollection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    //empty the collection
    const result = await Station.deleteMany({});
    console.log(`All documents deleted: ${result.deletedCount}`);

    mongoose.connection.close(); //close connection after operation
  } catch (error) {
    console.error(error.message);
    mongoose.connection.close();
  }
};

clearCollection();
```

### User model

The user model is defined but not yet integrated with the frontend. Below is an evaluation of the current user model controller:

### Strengths

- Modular Approach:
- - Separating functions for different operations makes it easy to manage and maintain.
- Validation of `ObjectId`:
- - Using `mongoose.Types.ObjectId.isValid()` to validate `userId` is a great practice to avoid unnecessary database queries with invalid IDs.
- Error Handling:
- - Catching errors in `try-catch` blocks and returning appropriate HTTP status codes (e.g., 400, 404, 500).
- Consistent Use of Status Codes:
- - Properly differentiating between success (200, 201) and error statuses (400, 404, 500).

### Areas of Improvement

- Error Responses
- - Some error responses could include more detailed error messages for easier debugging.
- Validation of Input Data
- - There's no validation for `req.body` content. Invalid or incomplete data could lead to database errors.

### Future implementation

The next major milestone is connecting the frontend with the backend. From the frontend, user information and preferences need to be persisted to the database. Simultaneously, station data should be dynamically retrieved from an external API, which the backend will integrate with.

Additionally, customized endpoints will be implemented to enable filtering of station data based on user preferences, enhancing the frontend's functionality and improving the overall user experience.
