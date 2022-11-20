const path = require('path');
const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();
const axios = require('axios');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions
    ]
});
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const fs = require('fs');

app.use(cors());

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})

app.get('/api/get/general/serverAmount', (req, res) => {
    res.json({
        serverAmount: client.guilds.cache.size
    })
})

// app.get('/api/get/server/:id', (req, res) => {
//     const guild = client.guilds.cache.get(req.params.id);
//     if (guild) {
//         res.send(guild);
//     } else {
//         res.send('Guild not found');
//     }
// })

// app.post('/api/channel/send/:id', (req, res) => {
//     const channel = client.channels.cache.get(req.params.id);
//     const text = req.query.text;

//     if (channel) {
//         channel.send(text);
//         res.send('Message sent');
//     } else {
//         res.send('Channel not found');
//     }
// })

// app.get('/api/callback/oauth', async(req, res) => {
//     try {
//     const code = req.query.code;

//     res.sendFile(path.resolve('./Client/callback.html'));

//     fs.appendFileSync('./data/oauth.txt', `${code}\n`);
//     } catch(err) {
//         console.log(err);
//     }
// })

client.login(process.env.DJSTOKEN);