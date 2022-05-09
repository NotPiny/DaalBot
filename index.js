//const stuff
const Discord = require("discord.js")
const fetch = require("node-fetch")
const keepAlive = require("./server")
const Database = require("@replit/database")
const TOKEN = process.env['TOKEN']
const db = new Database()
const gmtDateTime = new Date().toUTCString();
const currentYear = new Date().getFullYear();
const input = require('prompt-sync')();
const path = require('path')
const client = new Discord.Client()
const LogChannel = client.channels.cache.get(`968188003375808552`)
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
client.on("message", msg => {
  if (msg.author.bot) return

  let BotBanRole = msg.guild.roles.cache.get("973182673306660885");
const FMT = msg.mentions.members.first();

  if (msg.member.roles.cache.some(role => role.name === 'BotBanned')) return

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

  if (msg.content.startsWith("$say ")) {

      let input = msg.content.split(" ").slice(1).join(" ") // Removes the prefix

      msg.delete() // Deletes the message
      msg.channel.send(input) //.then(msg=>msg.delete({timeout:"5000"}) <- if you want delete it with delay and sends the finished text
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
    msg.reply('There is no current test')
}

  if (msg.content === "→TestBot") {
    msg.channel.send("Bot is responding")
    console.log(msg.author.tag + ' used →TestBot')
    client.channels.cache.get(`968188003375808552`).send(msg.author.tag + ' used →TestBot')
  }

  if (msg.content === "$DateTime") {
  msg.channel.send(gmtDateTime)
  }

  if (msg.content.startsWith("$PingMe")) {
    msg.channel.send("@" + msg.author.tag)
  }
  
  if (msg.content.startsWith("$UserInfo")) {
    msg.channel.send('Username: ' + msg.author.username + ' Tag: ' + msg.author.tag + ' ID: ' + msg.author.id + " " + 'Avatar: ' + msg.author.displayAvatarURL())
  console.log(msg.author.tag + ' used $UserInfo')
  client.channels.cache.get(`968188003375808552`).send(msg.author.tag + ' used $UserInfo')
  }
  
  if (msg.content === "→BotInfo") {
    msg.channel.send('Bot Name: ' + client.user.username + ',' + ' Bot Status: Responding')
        console.log(msg.author.tag + ' used →BotInfo')
    client.channels.cache.get(`968188003375808552`).send(msg.author.tag + ' used →BotInfo')
  }

  if (msg.content.startsWith("$DmMe")) {
    dm = msg.content.split("$DmMe ")[1]
    msg.author.send([1])
  }

  if (msg.content.endsWith(":P")) {
    msg.channel.send(":P")
    console.log(msg.author.tag + ' used :P')
  }

  if (msg.content === "$Help") {
    msg.channel.send("Hey i see you have ran my help command my prefix is normally [$] but for some commands it is [→] for a list of commands they are coming soon as piny is yet to make a list of command")
  console.log(msg.author.tag + ' used $Help')
    client.channels.cache.get(`968188003375808552`).send(msg.author.tag + ' used $Help')
  }

  if (msg.content.endsWith("Don't quote me on this")) {
    msg.channel.send(msg.content + " - " + msg.author.username + " " + currentYear)
    console.log(msg.author.username + 'activated "Dont quote me"')
    client.channels.cache.get(`968188003375808552`).send(msg.author.tag + ' used Dont quote me')
  }
  
  if (msg.content === "$Hello") {
    msg.reply("Hello there")
          console.log(msg.author.tag + ' used $Hello')
    LogChannel.send(msg.author.tag + ' used $Hello')
  }

  if (msg.content === "$inspire") {
    getQuote().then(quote => msg.channel.send(quote))
    console.log(msg.author.tag + ' used $inspire')
    LogChannel.send(msg.author.tag + ' used $inspire')
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
    client.channels.cache.get(`968188003375808552`).send(msg.author.tag + ' used $new')
  }

  if (msg.content.startsWith("$del")) {
    index = parseInt(msg.content.split("$del ")[1])
    deleteEncouragement(index)
    msg.channel.send("Encouraging message deleted.")
          console.log(msg.author.tag + ' used $del')
    client.channels.cache.get(`968188003375808552`).send(msg.author.tag + ' used $del')
  }

  if (msg.content.startsWith("$list")) {
    db.get("encouragements").then(encouragements => {
      msg.channel.send(encouragements)
      console.log(msg.author.tag + ' used $list')
      client.channels.cache.get(`968188003375808552`).send(msg.author.tag + ' used $list')
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
  client.channels.cache.get(`968188003375808552`).send(msg.author.tag + ' used $responding')
  }
})

keepAlive()
client.login(process.env.TOKEN)