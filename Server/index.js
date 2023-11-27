// This exists for bot.daalbot.xyz to get info about the actual bot :D
const client = require('../client');
const express = require('express');
const app = express();
const port = 8923;

app.use(express.json());

app.get('/api/status', (req, res) => {
    // Status type not defined so send all data about the client

    if (req.headers['user-agent'].toLowerCase().includes('mozilla')) {
        // Page is being loaded in a browser so add javascript to automatically refresh the page every 5 seconds
        const JSONDataString = JSON.stringify({
            guilds: client.guilds.cache.size,
            uptime: client.uptime,
            ping: client.ws.ping,
            process: {
                memoryPercentage: process.memoryUsage().heapTotal / process.memoryUsage().heapUsed,
            }
        }, null, 4).replace(/\n/g, '<br>').replace(/ /g, '&nbsp;')

        res.send(`${JSONDataString} <style>body { background-color: #1e1e1e; color: #ffffff; font-size: 2.5rem; font-family: system-ui; }</style><script>setTimeout(() => { window.location.reload() }, 5000)</script>`)
    } else {
        // Page is either being loaded by a http library or a browser that doesnt support mozzila stuff so just send the data
        res.json({
            guilds: client.guilds.cache.size,
            uptime: client.uptime,
            ping: client.ws.ping,
            process: {
                memoryPercentage: process.memoryUsage().heapTotal / process.memoryUsage().heapUsed,
            }
        })
    }
})

app.listen(port, () => {
    console.log(`Internal API listening on port ${port}`);
})