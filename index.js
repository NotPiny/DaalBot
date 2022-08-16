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
  }); require('./legacy/launch.js'); require('./edit.js'); const superLog = require('./superLog.js'); require('dotenv').config(); require('./vortex.js'); const path = require('path'); WOKCommands = require('wokcommands'); const fs = require('fs'); const config = require('./config.json'); const prefix = config.prefix; const activities = config.activities; require('./daal.js'); require('./olilz.js');

// Functions
function botLog(text) {
  client.channels.cache.find(channel => channel.id === config.Logchannel).send(text)
  console.log(text)
}

client.on('ready', () => {
  //When bot loads
  botLog(`Load > Logged in as ${client.user.tag}!`);
  client.user.setActivity("https://bit.ly/DaalBot", {
    type: "STREAMING",
    url: "https://www.twitch.tv/daalbott"
  });
  botLog('Status > Bot status has been set to "https://bit.ly/DaalBot"');
  
  //WOKCommands
  new WOKCommands(client, {
    commandsDir: path.join(__dirname, 'commands'),
    featuresDir: path.join(__dirname, 'features'),
    typeScript: false,
    testServers: config.WOKCommands.TestServers,
    botOwners: config.WOKCommands.BotOwners,
    mongoUri: process.env.MONGO_URI,
  })
  .setDefaultPrefix(config.WOKCommands.prefix)

  // Global mute info
  botLog(`Global Mute > Loaded with users as [${config.globalMuteIDs}]`)
  botLog(`Global Mute > Amount of users is [${(config.globalMuteIDs.length)}]`)

  // Status Changer
  setInterval(() => {
    // generate random number between 1 and list length.
    const randomIndex = Math.floor(Math.random() * (activities.length - 1) + 1);
    const newActivity = activities[randomIndex];

    client.user.setActivity(newActivity, {
    type: "STREAMING",
    url: "https://www.twitch.tv/daalbott"
    });
    botLog(`Status > Status is now "${newActivity}"`)

    // client.user.setActivity(newActivity);
  }, 3600000);
})

// Command Stuff :P
client.on("messageCreate", msg => {
  //Const stuff 2
  const LogIDs = config.LogIDs
  const TimeGB = new Date().toLocaleTimeString('en-GB', { hour12: false, hour: "numeric", minute: "numeric"})
  const command = `${prefix}${msg.content.toLowerCase()}`
  const SP = prefix;
  const channel = msg.channel;
  let FMT = msg.mentions.members.first();
  let FMR = msg.mentions.roles.first();
  const iEmbed = new MessageEmbed()
  .setTitle('Hello!')
  .setDescription(`My default prefix is \`${config.WOKCommands.prefix}\` though it may change depending on what server your in\n\n**LINKS:**\nWebsite: https://daalbot-a.web.app/\nInvite: https://daalbot-a.web.app/Invite\nCommands: https://daalbot-a.web.app/Commands`)
  .setTimestamp(msg.createdTimestamp)
  .setImage('https://pinymedia.web.app/Daalbot.png')
  const deletImages = [
    'https://media.makeameme.org/created/delete-this-now-68a6f723c1.jpg',
    'https://i.kym-cdn.com/photos/images/original/001/462/418/021.png',
    'https://img-comment-fun.9cache.com/media/axg0gjW/aVlg2wlQ_700w_0.jpg',
    'https://pbs.twimg.com/media/DAt7DzTUQAA7y1i.jpg'
  ];
  //Global Mute
  if (config.globalMuteIDs.includes(msg.author.id)) {
    if (config.WOKCommands.BotOwners.includes(msg.author.id)) {
      botLog(`Global Mute > ${msg.author.id} is immune to global mute`)
    }
    if (msg.deletable) {
      msg.delete();
      botLog(`Global Mute > Deleted Message by ${msg.author.username}`)
    }
  }
  //Log Msg
  fs.appendFile('./chat/raw-all.chatlog', `,\n{\ncontent: ${msg.content}\nID: ${msg.id}\nauthour: ${msg.author.id}\nTime Created: ${msg.createdTimestamp}\nChannel ID: ${msg.channelId}\nGuild ID: ${msg.guildId}\n}`, function (err) {
    if (err) throw err;
  });
  
if (LogIDs.includes(msg.guild.id)) {
  console.log(`[${msg.guild}, ${msg.channel.name}] ${msg.author.tag}: ${msg.content} (Message ID: ${msg.id})`)
  
    fs.appendFile('./chat/all.chatlog', `[${TimeGB}, ${msg.guild}, ${msg.channel.name}] ${msg.author.tag}: ${msg.content} (Message ID: ${msg.id})\n`, function (err) {
      if (err) throw err;
    });
  
  if (msg.guildId === '975358046832304188') {
    fs.appendFile('./chat/supreme.chatlog', `[${TimeGB}, ${msg.guild}, ${msg.channel.name}] ${msg.author.tag}: ${msg.content} (Message ID: ${msg.id})\n`, function (err) {
      if (err) throw err;
    });
  }
  
  if (msg.guildId === '858790500605100062') {
  fs.appendFile('./chat/daal.chatlog', `[${TimeGB}, ${msg.guild}, ${msg.channel.name}] ${msg.author.tag}: ${msg.content} (Message ID: ${msg.id})\n`, function (err) {
    if (err) throw err;
        });
      }
  
  if (msg.guildId === '747728787797573656') {
    fs.appendFile('./chat/olilz.chatlog', `[${TimeGB}, ${msg.guild}, ${msg.channel.name}] ${msg.author.tag}: ${msg.content} (Message ID: ${msg.id})\n`, function (err) {
      if (err) throw err;
          });
  }

  if (msg.guildId === '929883659819962379') {
    fs.appendFile('./chat/adam.chatlog', `[${TimeGB}, ${msg.guild}, ${msg.channel.name}] ${msg.author.tag}: ${msg.content} (Message ID: ${msg.id})\n`, function (err) {
      if (err) throw err;
          });
  }
    }

    if (msg.author.bot) return

    // Mention Info

    if (msg.content.toLowerCase().includes('<@965270659515183206>')) {
      msg.reply({
        content: 'Thanks for pinging me! Here is some info:',
        embeds: [iEmbed]
      })
    } 
    
    // :P
    
      if (msg.content.toLowerCase().endsWith(":p")) {
        const cmdname = `:P`
        msg.channel.send(":P")
        console.log(msg.author.tag + ' used :P')
      }
    
    // Don't quote me on this
    
      if (msg.content.toLowerCase().endsWith("don't quote me on this")) {
        const cmdname = `don't quote me on this`
        msg.channel.send(`${msg.content} \n-${msg.author.username} ${currentYear}`)
        console.log(msg.author.username + 'activated "Don\'t quote me"')
      }

      // Delay

      if (msg.content.toLowerCase().startsWith(`${prefix}delay`)) {
        const cmdname = `delay`
        msg.reply('Pinging <a:typing:976598236561289256>')
        .then((message) => {
        message.edit({
          content: `${Date.now() - msg.createdTimestamp}ms`, 
        })
        });
      }
      // fs.appendFile('./command-log.txt', `${msg.author.tag} has ran ${prefix}${cmdname} in ${msg.channel.name} in ${msg.guild.name}`, function (err) { if (err) throw err; })
  })

client.login(process.env.TOKEN)