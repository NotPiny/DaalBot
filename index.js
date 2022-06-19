//const stuff
const { Client, Intents } = require('discord.js')
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_BANS,
  ],
})
require('dotenv').config()
path = require('path')
const gmtDateTime = new Date().toUTCString();
const currentYear = new Date().getFullYear();
WOKCommands = require('wokcommands')
const fs = require('fs');

client.on('ready', () => {
  //When bot loads
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setActivity('/Cmds to get started');
  console.log('Bot status has been set to "/Cmds to get started"')
  
  new WOKCommands(client, {
    commandsDir: path.join(__dirname, 'commands'),
    
    typeScript: false,
    testServers: ['986280643526795334'],
    botOwners: ['664859750285967371'],
    mongoUri: process.env.MONGO_URI,
  })
})

//On Join

client.on('guildMemberAdd', (member) => {
  member.send('Welcome to the server!')
})

//Command Stuff :P
client.on("messageCreate", msg => {

//Log Msg
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

//Tests & Var
  if (msg.author.bot) return
  const Rcollector = msg.createReactionCollector()
  let BotBanRole = msg.guild.roles.cache.get(role => role.name === 'BotBanned');
  const FMT = msg.mentions.members.first();
  const cmd = `${msg.content.toLowerCase()}`
  const commandList = `Dev: \n /Shutdown, /Status \n Admin: \n /send, /clear, /Kick, /Ban \n User: \n $Cmds, /CrashTest, $DevCheck, %Test, /TestBot, /DateTime, $PingMe, $UserInfo, /BotInfo, :P (Activates when ":P" is located at the end of a message), /Help, Don't quote me on this (Activate when "Don't quote me on this" is located at the end of a message), /Hello, /Site, /Invite`

  if (msg.member.roles.cache.some(role => role.name === 'BotBanned')) {
      return
    }
    var result = 'NO DATA'

//Automatic

//Poll

  if (msg.content.toLowerCase().includes('poll')) {
    msg.react('✅')
    msg.react('❌')
    msg.react('➖')
  }

  //All Users

  if (msg.content.toLowerCase().startsWith('$devcheck')) {
    if (msg.author.tag === ('Piny#1000', 'DaalSAVAGE#8247')) {
      msg.reply('You are a dev!')
    }
    else {
      msg.reply('Sorry buddy you are not a dev')
    }
  }

  if (msg.content.toLowerCase().startsWith("$pingme")) {
    msg.reply("@" + msg.author.tag)
  }
  
  if (msg.content.toLowerCase().startsWith("$userinfo")) {
    if (!FMT) {
    msg.channel.send('Username: ' + msg.author.username + ' Tag: ' + msg.author.tag + ' ID: ' + msg.author.id + " " + 'Avatar: ' + msg.author.displayAvatarURL())
  } else {
      msg.channel.send('Username: ' + FMT.username + ' Tag: ' + FMT.tag + ' ID: ' + FMT.id + " " + 'Avatar: UNABLE TO GRAB USER AVATAR')
  }
}

  if (msg.content.toLowerCase().endsWith(":p")) {
    msg.channel.send(":P")
    console.log(msg.author.tag + ' used :P')
  }

  if (msg.content.toLowerCase().endsWith("don't quote me on this")) {
    msg.channel.send(msg.content + " - " + msg.author.username + " " + currentYear)
    console.log(msg.author.username + 'activated "Dont quote me"')
  }

})

client.login(process.env.TOKEN)