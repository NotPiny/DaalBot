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
const DevIDs = [664859750285967371]
WOKCommands = require('wokcommands')

client.on('ready', () => {
  //When bot loads
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setActivity('$Help to get started');
  console.log('Bot status has been set to "$Help to get started"')
  
  new WOKCommands(client, {
    commandsDir: path.join(__dirname, 'commands'),
    typeScript: false,
    testServers: ['968288776268947566', '858790500605100062', '975358046832304188'],
    botOwners: ['664859750285967371'],
    mongoUri: process.env.MONGO_URI,
  })
})

//Command Stuff :P
client.on("messageCreate", msg => {
//Log Msg
console.log(`[${msg.guild}, ${msg.channel.name}] ${msg.author.tag}: ${msg.content} (Message ID: ${msg.id})`)
//Tests & Var
  if (msg.author.bot) return

  let BotBanRole = msg.guild.roles.cache.get("973182673306660885");
  const FMT = msg.mentions.members.first();
  const cmd = `${msg.content.toLowerCase()}`
  const commandList = `Dev: \n $Shutdown, /Status \n Admin: \n /send, /clear, $Kick, $Ban, $BotBan \n User: \n Cmds, $CrashTest, $DevCheck, %Test, →TestBot, $DateTime, $PingMe, UserInfo, →BotInfo, :P (Activates when ":P" is located at the end of a message), $Help, Don't quote me on this (Activate when "Don't quote me on this" is located at the end of a message), $Hello`

  if (msg.member.roles.cache.some(role => role.name === 'BotBanned')) {
      return
    }

//Automatic

  if (msg.content.toLowerCase().includes('poll')) {
    msg.react('✅')
    msg.react('❌')
  }

//Perms Needed

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
  
  if (msg.content.toLowerCase() == "$shutdown") {
    if (msg.member.roles.cache.some(role => role.id === '980145544750063677')) {
        msg.reply("Shutting down...").then(() => {
          client.user.setActivity(`a dev has shut me down`);
          client.user.setStatus('idle'); 
          console.log(`${msg.author.tag} has shutdown the bot`)
            client.channels.cache.find(channel => channel.id === 968188003375808552).send(`${msg.author.tag} has shutdown the bot`)
            client.destroy();
        })
    } else {
      msg.reply('Sorry but you do not have permission to run the command `Shutdown` as you do not have the `Bot Dev` role')
    }
  }
  
  if (msg.content.toLowerCase().startsWith('$botban')) {
    if (msg.member.roles.cache.some(role => role.name === 'Admin')) {
    if (!FMT) {
        msg.reply('Did not detect user')
        return;
    } else {
        FMT.roles.add(BotBanRole);
        msg.reply(`Bot Banned ${FMT.user.username}`)
    }
  } else {
      msg.reply('No Perms!')
  }
}

  //All Users

  if (msg.content.toLowerCase().startsWith('$cmds')) {
    msg.reply(commandList)
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