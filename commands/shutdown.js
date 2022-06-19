const { Interaction } = require("discord.js")

module.exports = {
    category: 'Piny Only',
    description: 'Takes the bot offline',
  
    slash: true,
    testOnly: true,
  
    ownerOnly: true,
  
    callback: ({ message, client, text }) => {
      client.user?.setPresence({
        status: 'online',
        activities: [
          {
            name: 'I have been shutdown',
          },
        ],
      })
      process.exit()
    },
  }
  