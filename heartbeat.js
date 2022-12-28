const express = require('express');

require('dotenv').config(); // Loads port from .env file if you don't want to have it on port 7284

const app = express();

const port = 7284 || process.env.PORT;

app.listen(port, () => {
    console.log(`Heartbeat > Server is running on port ${port}`);
})

app.get('/daalbot/heartbeat', async(req, res) => {
 try {
    res.send('I am alive');
 } catch {
    throw new Error('Heartbeat > Something went wrong, shutting down for new process to start');
 }
})