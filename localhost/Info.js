const settings = require('./settings.json');
const client = require('../client');
const path = require('path');
require('dotenv').config();

const express = require('express');
const app = express();
const port = settings.infoPort;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/Info/index.html'));
})

app.listen(port, () => {
  console.log(`Info site ready`);
})