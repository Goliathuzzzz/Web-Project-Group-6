const express = require('express');
const app = express();
const stationRoutes = require('./routes/stationRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());

app.use('/stations', stationRoutes);
app.use('/users', userRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
