const express = require('express');
const connectDB = require('./config/db');
const app = express();
const stationRoutes = require('./routes/stationRoutes');
const userRoutes = require('./routes/userRoutes');
const logger = require('./middleware/logger');
const chargerRoutes = require('./routes/ocmStationRoutes'); 

require('dotenv').config();
connectDB();

app.use(express.json());
app.use(logger);

app.get('/', (req, res) => res.send('API Running!'));

// app.use('/stations', stationRoutes);
app.use('/users', userRoutes);

//new for chargers
app.use('/api/chargers', chargerRoutes); 

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
