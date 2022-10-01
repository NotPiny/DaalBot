//const stuff
const client = require('./client.js'); const config = require('./config.json');
  function botLog(text) {
    client.channels.cache.find(channel => channel.id === config.Logchannel).send(text)
    console.log(text)
  }

client.on('rateLimit', () => {
  console.log('Info > Client rate limited')
});

client.on('guildCreate', guild => {
  botLog(`\nBot added to server: {\nName: ${guild.name}\nID: ${guild.id}\nOwner: ${guild.ownerId}\n}\nNow in ${client.guilds.cache.size} servers`);
})

client.on('guildDelete', guild => {
  botLog(`\nBot removed from server (${guild.id}) \nNow in ${client.guilds.cache.size} servers`);
})