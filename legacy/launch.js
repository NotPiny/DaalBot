/**
  Template
  
   
//const stuff
const { Client, Intents, VoiceChannel, Message } = require('discord.js'); 
const client = new Client({
   intents: [
     Intents.FLAGS.GUILDS, 
     Intents.FLAGS.GUILD_MESSAGES, 
     Intents.FLAGS.GUILD_MESSAGE_REACTIONS, 
     Intents.FLAGS.GUILD_PRESENCES, 
     Intents.FLAGS.GUILD_BANS, 
     Intents.FLAGS.GUILD_MEMBERS, 
    ]
  }); require('dotenv').config(); const path = require('path'); WOKCommands = require('wokcommands'); const fs = require('fs'); const config = require('../config.json'); const prefix = config.prefix; const LogIDs = config.LogIDs; const activities = config.activities;
// Command Stuff :P
client.on("messageCreate", msg => {
    
})

client.login(process.env.TOKEN)
 */
require('./game.js')