//const stuff
const { Client, Intents, VoiceChannel, Message, MessageEmbed, MessageAttachment, } = require('discord.js'); 
const client = new Client({
   intents: [
     Intents.FLAGS.GUILDS, 
     Intents.FLAGS.GUILD_MESSAGES, 
     Intents.FLAGS.GUILD_MESSAGE_REACTIONS, 
     Intents.FLAGS.GUILD_PRESENCES, 
     Intents.FLAGS.GUILD_BANS, 
     Intents.FLAGS.GUILD_MEMBERS, 
    ]
  }); require('dotenv').config(); const config = require('./config.json'); const prefix = config.prefix;

client.on('ready', () => {
  //When bot loads
  console.log(`Load > Edit loaded`);
})

client.on('error', err => {
    console.log(`Error > ${err}`)
})

client.on('messageUpdate', msg => {
  // TODO
})

client.login(process.env.TOKEN)