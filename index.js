//const stuff
const { ReactionEmoji } = require('discord.js');
const { ReactionManager } = require('discord.js');
const { Message } = require('discord.js');
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
const DevIDs = [664859750285967371]
WOKCommands = require('wokcommands')
const fs = require('fs');
const { reduceEachTrailingCommentRange } = require('typescript');
const NeverGonnaL = `We're no strangers to love \nYou know the rules and so do I (do I) \nA full commitment's what I'm thinking of \nYou wouldn't get this from any other guy \nI just wanna tell you how I'm feeling \nGotta make you understand \nNever gonna give you up \nNever gonna let you down \nNever gonna run around and desert you \nNever gonna make you cry \nNever gonna say goodbye \nNever gonna tell a lie and hurt you \nWe've known each other for so long \nYour heart's been aching, but you're too shy to say it (say it) \nInside, we both know what's been going on (going on) \nWe know the game and we're gonna play it \nAnd if you ask me how I'm feeling \nDon't tell me you're too blind to see \nNever gonna give you up \nNever gonna let you down \nNever gonna run around and desert you \nNever gonna make you cry \nNever gonna say goodbye \nNever gonna tell a lie and hurt you \nNever gonna give you up \nNever gonna let you down \nNever gonna run around and desert you \nNever gonna make you cry \nNever gonna say goodbye \nNever gonna tell a lie and hurt you \nWe've known each other for so long \nYour heart's been aching, but you're too shy to say it (to say it) \nInside, we both know what's been going on (going on) \nWe know the game and we're gonna play it \nI just wanna tell you how I'm feeling \nGotta make you understand \nNever gonna give you up \nNever gonna let you down \nNever gonna run around and desert you \nNever gonna make you cry \nNever gonna say goodbye \nNever gonna tell a lie and hurt you \nNever gonna give you up \nNever gonna let you down \nNever gonna run around and desert you \nNever gonna make you cry \nNever gonna say goodbye \nNever gonna tell a lie and hurt you \nNever gonna give you up \nNever gonna let you down \nNever gonna run around and desert you \nNever gonna make you cry \nNever gonna say goodbye \nNever gonna tell a lie and hurt you`

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
//Perms Needed

  // Management

  if (msg.content.toLowerCase().startsWith('foo') && msg.guild.id === '986280643526795334') {
    msg.reply('Command works 🥳🥳🥳🥳🥳')
  }

  //Other

  if (msg.content.toLowerCase().startsWith('$kick')) {
    if (msg.member.roles.cache.some(role => role.name === 'Admin')) {
    if (!FMT) {
        msg.reply('Did not detect user')
        return;
    } else {
        FMT.kick();
        msg.reply(`Kicked ${FMT.user.username}`)
    }
  } else {
      msg.reply('No Perms!')
  }
}

  if (msg.content.toLowerCase().startsWith('$ChatLogs')) {
    msg.reply('This command has not been setup yet')
  }

  if (msg.content.toLowerCase().startsWith('$ban')) {
    if (msg.member.roles.cache.some(role => role.name === 'Admin')) {
    if (!FMT) {
        msg.reply('Did not detect user')
        return;
    } else {
        FMT.ban();
        msg.reply(`Banned ${FMT.user.username}`)
    }
  } else {
      msg.reply('No Perms!')
  }
}

  //All Users

  if (msg.content.toLowerCase().startsWith('$site')) {
    msg.reply('You can check out my website here: https://daalbot-a.web.app')
  }

  if (msg.content.toLowerCase().startsWith('$invite')) {
    msg.reply('You can invite me to your server with this link: https://daalbot-a.web.app/Invite')
  }

  if (msg.content.toLowerCase().startsWith('$nggyu')) {
    msg.channel.send(NeverGonnaL)
  }

  if (msg.content.toLowerCase().startsWith('$cmds')) {
    msg.reply(`${commandList} \n You can also see more info about commands at https://daalbot-a.web.app/Commands`)
  }

  if (msg.content.toLowerCase().startsWith('$crashtest')) {
    msg.reply('The bot did not crash')
  }

  if (msg.content.toLowerCase().startsWith('$devcheck')) {
    if (msg.author.tag === ('Piny#1000', 'DaalSAVAGE#8247')) {
      msg.reply('You are a dev!')
    }
    else {
      msg.reply('Sorry buddy you are not a dev')
    }
  }
  
  if (cmd.startsWith('%test')) {
    msg.reply('The test worked')
}

  if (msg.content.toLowerCase().startsWith("→testbot")) {
    msg.channel.send("Bot is responding")
    console.log(msg.author.tag + ' used →TestBot')
  }

  if (msg.content.toLowerCase().startsWith("$datetime")) {
  msg.reply(gmtDateTime)
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
  
  if (msg.content.toLowerCase().startsWith("→botinfo")) {
    msg.channel.send('Bot Name: ' + client.user.username + ',' + ' Bot Status: Responding')
        console.log(msg.author.tag + ' used →BotInfo')
  }

  if (msg.content.toLowerCase().endsWith(":p")) {
    msg.channel.send(":P")
    console.log(msg.author.tag + ' used :P')
  }

  if (msg.content.toLowerCase().startsWith("$help")) {
    msg.reply("Hey i see you have ran my help command my prefix is normally [$] for a list of commands run `$Cmds`")
  console.log(msg.author.tag + ' used $Help')
  }

  if (msg.content.toLowerCase().endsWith("don't quote me on this")) {
    msg.channel.send(msg.content + " - " + msg.author.username + " " + currentYear)
    console.log(msg.author.username + 'activated "Dont quote me"')
  }

  if (msg.content.toLowerCase().startsWith("$hello")) {
    msg.reply("Hello there")
          console.log(msg.author.tag + ' used $Hello')
  }

})

client.login(process.env.TOKEN)