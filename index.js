const Discord = require("discord.js")
const fetch = require("node-fetch")
const keepAlive = require("./server")
const Database = require("@replit/database")
const TOKEN = process.env['TOKEN']
const db = new Database()
const client = new Discord.Client()

const sadWords = ["sad", "depressed", "unhappy", "angry"]

const starterEncouragements = [
  "Cheer up!",
  "Hang in there.",
  "You are a great person / bot!"
  ,"You can do anything"
]

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

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})
client.on("message", msg => {
  if (msg.author.bot) return

  if (msg.content === "→TestBot") {
    msg.channel.send("Bot is responding")
    console.log(msg.author.tag + ' used →TestBot')
  }

  if (msg.content === "→BotInfo") {
    msg.channel.send('Bot Name: DaalBot, Bot Status: Online')
        console.log(msg.author.tag + ' used →BotInfo')
  }

  if (msg.content === "$Help") {
    msg.channel.send("Hey i see you have ran my help command my prefix is normally [$] but for some commands it is [→] for a list of commands they are coming soon as piny is yet to make a list of command")
  console.log(msg.author.tag + ' used $Help')
  }
  
  if (msg.content === "$Hello") {
    msg.channel.send("Hello there")
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