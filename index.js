//Options
const prefix = '$'
const LogIDs = [
  '858790500605100062'
]
//const stuff
const { Client, Intents, VoiceChannel, Message } = require('discord.js')
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
})
require('dotenv').config()
const path = require('path')
WOKCommands = require('wokcommands')
const fs = require('fs');
const config = require('./config.json')
const activities = config.activities

client.on('ready', () => {
  //When bot loads
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setActivity('/Cmds to get started');
  console.log('Bot status has been set to "/Cmds to get started"')
  
  //WOKCommands
  new WOKCommands(client, {
    commandsDir: path.join(__dirname, 'commands'),
    
    typeScript: false,
    testServers: ['986280643526795334'],
    botOwners: ['664859750285967371'],
    mongoUri: process.env.MONGO_URI,
  })

  // Status Changer
  setInterval(() => {
    // generate random number between 1 and list length.
    const randomIndex = Math.floor(Math.random() * (activities.length - 1) + 1);
    const newActivity = activities[randomIndex];

    client.user.setActivity(newActivity);
  }, 300000);
})

//On Join

client.on('guildMemberAdd', (member, guild) => {
  member.send(`Welcome to the server!\nMake sure to read the rules\n\nHave a great time`)
})

// Command Stuff :P

client.on("messageCreate", msg => {
  //Log Msg
if (LogIDs.includes(msg.guild.id)) {
  console.log(`[${msg.guild}, ${msg.channel.name}] ${msg.author.tag}: ${msg.content} (Message ID: ${msg.id})`)
  
    fs.appendFile('./chat/all.txt', `[${msg.guild}, ${msg.channel.name}] ${msg.author.tag}: ${msg.content} (Message ID: ${msg.id})\n`, function (err) {
      if (err) throw err;
    });
  
  if (msg.guildId === '975358046832304188') {
    fs.appendFile('./chat/supreme.txt', `[${msg.guild}, ${msg.channel.name}] ${msg.author.tag}: ${msg.content} (Message ID: ${msg.id})\n`, function (err) {
      if (err) throw err;
    });
  }
  
  if (msg.guildId === '858790500605100062') {
  fs.appendFile('./chat/daal.txt', `[${msg.guild}, ${msg.channel.name}] ${msg.author.tag}: ${msg.content} (Message ID: ${msg.id})\n`, function (err) {
    if (err) throw err;
        });
      }
    }

    if (msg.author.bot) return
    
    // Poll
    
      if (msg.content.toLowerCase().includes('poll')) {
        msg. react('✅')
        msg.react('❌')
        msg.react('➖')
      } 
    
    // :P
    
      if (msg.content.toLowerCase().endsWith(":p")) {
        msg.channel.send(":P")
        console.log(msg.author.tag + ' used :P')
      }
    
    // Don't quote me on this
    
      if (msg.content.toLowerCase().endsWith("don't quote me on this")) {
        msg.channel.send(`${msg.content} \n-${msg.author.username} ${currentYear}`)
        console.log(msg.author.username + 'activated "Don\'t quote me"')
      }
})

client.login(process.env.TOKEN)