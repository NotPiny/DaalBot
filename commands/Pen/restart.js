const { Interaction } = require("discord.js");
const config = require('../../config.json');
const botPath = config.botPath;
const Logchannel = config.Logchannel;
module.exports = {
    category: 'Pen',
    description: 'Restarts the bot',
  
    slash: true,
    testOnly: true,
  
    ownerOnly: true,
  
    callback: ({ message, user, client, text, interaction }) => {
      function botLog(text) {
        client.channels.cache.find(channel => channel.id === Logchannel).send(text)
        console.log(text)
      }
      client.user?.setPresence({
        status: 'online',
        activities: [
          {
            name: 'Restarting...',
          },
        ],
      })
      require('child_process').exec(`start "" "${botPath}\\Batch/start.bat"`);
      botLog(`<@${user.id}> restarted the bot`)
      interaction.reply({
        content: 'Restarting...'
      })
      .then(() => { console.log(':)') })
      .catch(() => { console.log('bruh') })
      process.exit();
    },
  }
  