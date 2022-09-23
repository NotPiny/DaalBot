//const stuff
const client = require('./client.js'); require('dotenv').config(); const config = require('./config.json'); const fs = require('fs');

  function botLog(text) {
    client.channels.cache.find(channel => channel.id === config.Logchannel).send(text)
    console.log(text)
  }

client.on('ready', () => {
  //When bot loads
  botLog(`Log > Super Logs loaded`);
  fs.appendFile('./super-log.log', `\nBot Started!`, function (err) {
    if (err) throw err;
  });
})

client.on('rateLimit', () => {
  console.log(`INFO > Client got rate limited`)
    fs.appendFile('./super-log.log', '\nClient got rate limited!', function (err) {
        if (err) throw err;
    });
})

client.on('error', err => {
  console.log(`Log > Error: ${err.message}`)
  fs.appendFile('./super-log.log', `\nError: ${err.message}`, function (err) {
    if (err) throw err;
  });
})

client.on('guildCreate', guild => {
  botLog(`\nBot added to server: {\nName: ${guild.name}\nID: ${guild.id}\nOwner: ${guild.ownerId}\n}\nNow in ${client.guilds.cache.size} servers`);
})

client.on('guildDelete', guild => {
  botLog(`\nBot removed from server (${guild.id}) \nNow in ${client.guilds.cache.size} servers`);
})