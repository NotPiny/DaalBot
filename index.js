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
const fetch = require("node-fetch")
const keepAlive = require("./server")
const Database = require("@replit/database")
const TOKEN = process.env['TOKEN']
const db = new Database()
const gmtDateTime = new Date().toUTCString();
const currentYear = new Date().getFullYear();
const input = require('prompt-sync')();
const path = require('path')
const DevIDs = [664859750285967371]
const sadWords = ["sad", "depressed", "unhappy", "angry"]
const express = require("express")
const server = express()
const starterEncouragements = [
  "Cheer up!",
  "Hang in there.",
  "You are a great person / bot!",
  "You can do anything"
]
//database stuff idk this was included in the template code to host the bot
db.get("encouragements").then(encouragements => {
  if (!encouragements || encouragements.length < 1) {
    db.set("encouragements", starterEncouragements)
  }
})

db.get("responding").then(value => {
  if (value == null) {
    db.set("responding", true)
  }
})

function updateEncouragements(encouragingMessage) {
  db.get("encouragements").then(encouragements => {
    encouragements.push([encouragingMessage])
    db.set("encouragements", encouragements)
  })
}

function deleteEncouragement(index) {
  db.get("encouragements").then(encouragements => {
    if (encouragements.length > index) {
      encouragements.splice(index, 1)
      db.set("encouragements", encouragements)
    }
  })
}

function getQuote() {
  return fetch("https://zenquotes.io/api/random")
    .then(res => {
      return res.json()
    })
    .then(data => {
      return data[0]["q"] + " -" + data[0]["a"]
    })
}

client.on('ready', () => {
  //When bot loads
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setActivity('$Help to get started');
  console.log('Bot status has been set to "$Help to get started"')
})
//Command Stuff :P
client.on("messageCreate", msg => {
  if (msg.author.bot) return

  let BotBanRole = msg.guild.roles.cache.get("973182673306660885");
const FMT = msg.mentions.members.first();

  if (msg.member.roles.cache.some(role => role.name === 'BotBanned')) {
      return
    }
  
  if (msg.content === '$CrashTest') {
    msg.reply('The bot did not crash')
  }
  
  if (msg.content.startsWith('$Kick')) {
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

  if (msg.content.startsWith('$Ban')) {
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
    if (msg.member.roles.cache.some(role => role.name === 'Admin')) {
        msg.reply("Shutting down...").then(() => {
          client.user.setActivity(`a dev has shut me down`);
          client.user.setStatus('idle'); 
          console.log(`${msg.author.tag} has shutdown the bot`)
            client.channels.cache.find(channel => channel.id === 968188003375808552).send(`${msg.author.tag} has shutdown the bot`)
            client.destroy();
        })
    } else {
      msg.reply('Sorry but you do not have permission to run the command `Shutdown` as you do not have the `Admin` role')
    }
  }
  
  if (msg.content.startsWith('$BotBan')) {
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
  
  if (msg.content.startsWith('$DevCheck')) {
    if (msg.author.tag === ('Piny#1000', 'DaalSAVAGE#8247')) {
      msg.reply('You are a dev!')
    }
    else {
      msg.reply('Sorry buddy you are not a dev')
    }
  }
  
  if (msg.content.startsWith('%Test')) {
    msg.reply ({
  files: ['https://cdn.discordapp.com/attachments/968109463758331914/979713863882772511/9ba2cde938dd3383.png']
})
    
}

  if (msg.content === "→TestBot") {
    msg.channel.send("Bot is responding")
    console.log(msg.author.tag + ' used →TestBot')
  }

  if (msg.content === "$DateTime") {
  msg.reply(gmtDateTime)
  }

  if (msg.content.startsWith("$PingMe")) {
    msg.reply("@" + msg.author.tag)
  }
  
  if (msg.content.startsWith("$UserInfo")) {
    if (!FMT) {
    msg.channel.send('Username: ' + msg.author.username + ' Tag: ' + msg.author.tag + ' ID: ' + msg.author.id + " " + 'Avatar: ' + msg.author.displayAvatarURL())
  } else {
      msg.channel.send('Username: ' + FMT.username + ' Tag: ' + FMT.tag + ' ID: ' + FMT.id + " " + 'Avatar: UNABLE TO GRAB USER AVATAR')
  }
}
  
  if (msg.content === "→BotInfo") {
    msg.channel.send('Bot Name: ' + client.user.username + ',' + ' Bot Status: Responding')
        console.log(msg.author.tag + ' used →BotInfo')
  }

  if (msg.content.endsWith(":P")) {
    msg.channel.send(":P")
    console.log(msg.author.tag + ' used :P')
  }

  if (msg.content === "$Help") {
    msg.reply("Hey i see you have ran my help command my prefix is normally [$] for a list of commands they are coming soon as piny is yet to make a list of command")
  console.log(msg.author.tag + ' used $Help')
  }

  if (msg.content.endsWith("Don't quote me on this")) {
    msg.channel.send(msg.content + " - " + msg.author.username + " " + currentYear)
    console.log(msg.author.username + 'activated "Dont quote me"')
  }
  
  if (msg.content === "$Hello") {
    msg.reply("Hello there")
          console.log(msg.author.tag + ' used $Hello')
  }

  if (msg.content === "$inspire") {
    getQuote().then(quote => msg.channel.send(quote))
    console.log(msg.author.tag + ' used $inspire')
  }

  db.get("responding").then(responding => {
    if (responding && sadWords.some(word => msg.content.includes(word))) {
      db.get("encouragements").then(encouragements => {
        const encouragement = encouragements[Math.floor(Math.random() * encouragements.length)]
        msg.reply(encouragement)
      })
    }
  })
  
  if (msg.content.startsWith("$new")) {
    encouragingMessage = msg.content.split("$new ")[1]
    updateEncouragements(encouragingMessage)
    msg.channel.send("New encouraging message added.")
          console.log(msg.author.tag + ' used $new')
  }

  if (msg.content.startsWith("$del")) {
    index = parseInt(msg.content.split("$del ")[1])
    deleteEncouragement(index)
    msg.channel.send("Encouraging message deleted.")
          console.log(msg.author.tag + ' used $del')
  }

  if (msg.content.startsWith("$list")) {
    db.get("encouragements").then(encouragements => {
      msg.channel.send(encouragements)
      console.log(msg.author.tag + ' used $list')
    })
  }

  if (msg.content.startsWith("$responding")) {
    value = msg.content.split("$responding ")[1]

    if (value.toLowerCase() == "true") {
      db.set("responding", true)
      msg.channel.send("Responding is on.")
    } else {
      db.set("responding", false)
      msg.channel.send("Responding is off.")
    }
  }
})

keepAlive()
client.login(process.env.TOKEN)