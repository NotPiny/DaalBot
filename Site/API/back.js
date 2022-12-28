const path = require('path');
const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();
const axios = require('axios');
const DiscordOauth2 = require("discord-oauth2");
const oauth = new DiscordOauth2();

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
const crypto = require('crypto');
const fs = require('fs');

app.use(cors());

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})

app.get('/api/post/forms/issues', (req, res) => {
    res.send('Hello World!');
})

// app.post('/api/post/users/create', async(req, res) => {
//     let uid = req.query.uid;
//     let salt = req.headers.salt;
//     let hash = req.headers.hash;

//     let user = {
//         uid: uid,
//         salt: salt,
//         userSecretHash: hash
//     }

//     const dir = `./data/users/${uid}.json`;

//     if (fs.existsSync(dir)) {
//         res.status(400).send('User already exists');
//     } else {
//         fs.appendFileSync(dir, JSON.stringify(user));
//     }
// })

// app.get(`/api/get/users/:uid`, (req, res) => {
//     if (!fs.existsSync(`./data/users/${req.params.uid}.json`)) {
//         return res.status(404).send('User does not exist');
//     }

//     let uid = req.query.uid;
//     const userData = JSON.parse(fs.readFileSync(`./data/users/${uid}.json`));
//     let salt = userData.salt;
//     let userSecret = req.headers.usersecret;

//     let hash = crypto.createHmac('sha256', salt).update(userSecret).digest('hex');

//     const userHash = userData.userSecretHash;

//     if (hash === userHash) {
//         res.status(200).send('User authenticated');
//     } else {
//         res.status(401).send('Invalid hash');
//     }
// })

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

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Client', 'about.html'));
})

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