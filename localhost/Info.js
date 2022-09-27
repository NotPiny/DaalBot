const express = require('express');
const app = express();
const settings = require('./settings.json');
const port = settings.infoPort;
const client = require('../client');
require('dotenv').config();

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})