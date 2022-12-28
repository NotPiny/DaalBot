const { Client } = require("discord.js")

module.exports = {
    category: 'Testing',
    description: 'Displays info about the bot',
  
    slash: 'both',
    testOnly: false,
  
    callback: (client) => {
      return `Tag: ${client.tag}\nID: ${client.id}`
      
      
    },
  }