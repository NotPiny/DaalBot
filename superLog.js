//const stuff
const { Client, Intents, VoiceChannel, Message, MessageEmbed, MessageAttachment, Interaction, } = require('discord.js'); 
const client = new Client({
   intents: [
     Intents.FLAGS.GUILDS, 
     Intents.FLAGS.GUILD_MESSAGES, 
     Intents.FLAGS.GUILD_MESSAGE_REACTIONS, 
     Intents.FLAGS.GUILD_PRESENCES, 
     Intents.FLAGS.GUILD_BANS, 
     Intents.FLAGS.GUILD_MEMBERS, 
    ]
  }); require('dotenv').config(); const config = require('./config.json'); const fs = require('fs');

client.on('ready', () => {
  //When bot loads
  console.log(`Log > Super Logs loaded`);
  fs.appendFile('./super-log.log', `\nBot Started!`, function (err) {
    if (err) throw err;
  });
})

client.on('messageCreate', msg => {
    fs.appendFile('./super-log.log', `\nMessage Created: {\ncontent: "${msg.content}"\nID: ${msg.id}\nauthour: ${msg.author.id} / ${msg.author.tag}\nTime Created: ${msg.createdTimestamp}\nChannel ID: ${msg.channelId}\nGuild ID: ${msg.guildId}\n}`, function (err) {
        if (err) throw err;
      });
})

client.on('messageDelete', msg => {
    fs.appendFile('./super-log.log', `\nMessage Deleted: {\ncontent: "${msg.content}"\nID: ${msg.id}\nauthour: ${msg.author.id} / ${msg.author.tag}\nTime Created: ${msg.createdTimestamp}\nChannel ID: ${msg.channelId}\nGuild ID: ${msg.guildId}\n}`, function (err) {
        if (err) throw err;
      });
})

client.on('rateLimit', () => {
  console.log(`INFO > Client got rate limited`)
    fs.appendFile('./super-log.log', '\nClient got rate limited!', function (err) {
        if (err) throw err;
    });
})

client.on('interactionCreate', interaction => {
    fs.appendFile('./super-log.log', `\nInteraction created: {\nCreated: "${interaction.createdAt}" Timestamp: ${interaction.createdTimestamp}\nID: ${interaction.id}\n}`, function (err) {
        if (err) throw err;
    });
})

client.on('messageUpdate', msg => {
  fs.appendFile('./super-log.log', `\nMessage Updated: {\ncontent: unknown\nID: ${msg.id}\nauthour: ${msg.author.id}\nTime Created: ${msg.createdTimestamp}\nChannel ID: ${msg.channelId}\nGuild ID: ${msg.guildId}\n}`, function (err) {
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
  console.log(`\nBot added to server: {\nName: ${guild.name}\nID: ${guild.id}\nOwner: ${guild.ownerId}\n}\nNow in ${client.guilds.cache.size} servers`)
})

client.login(process.env.TOKEN);