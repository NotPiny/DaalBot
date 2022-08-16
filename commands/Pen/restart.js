const { Interaction } = require("discord.js")
const { botPath } = require('../../config.json')
module.exports = {
    category: 'Pen',
    description: 'Restarts the bot',
  
    slash: true,
    testOnly: true,
  
    ownerOnly: true,
  
    callback: ({ message, client, text, interaction }) => {
      client.user?.setPresence({
        status: 'online',
        activities: [
          {
            name: 'Restarting...',
          },
        ],
      })
      interaction.reply({
        content: 'Restarting...'
      })
      require('child_process').exec(`start "" "${botPath}/start.bat"`);
      client.destroy();
    },
  }
  