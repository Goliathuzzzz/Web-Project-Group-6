const express = require('express');
const connectDB = require('./config/db');
const helmet = require('helmet');
const cors = require('cors');
const stationRoutes = require('./routes/stationRoutes');
const userRoutes = require('./routes/userRoutes');
const chargerRoutes = require('./routes/ocmStationRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const logger = require('./middleware/logger');

const app = express();
require('dotenv').config();
connectDB();

app.use(cors());
app.use(express.json());
app.use(logger);

app.use(helmet());

app.get('/', (req, res) => res.send('API Running!'));

app.use('/api/stations', stationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chargers', chargerRoutes);
app.use('/api/reviews', reviewRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
