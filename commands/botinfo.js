const { Client } = require("discord.js")

module.exports = {
    category: 'Testing',
    description: 'Displays info about the bot',
  
    slash: 'both',
    testOnly: false,
  
    callback: () => {
      return `Name: ${Client.name}`
    },
  }