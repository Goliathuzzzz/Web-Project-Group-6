const express = require('express');
const app = express();
const stationRouter = require('./routes/stationRouter');
const userRouter = require('./routes/userRouter');

app.use(express.json());

app.use('/stations', stationRouter);
app.use('/users', userRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});