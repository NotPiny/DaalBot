const client = require('../../client');
const fs = require('fs');
require('dotenv').config();

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand) {
        return
    }
    function reply(text) {
      try {
        interaction.reply(`${text}`);
        return `Replied to ${interaction.id}`
      } catch (error) {
        return `\`\`\`\n${error}\n\`\`\`\``
      }
    }

    const { CommandName, options } = interaction;

    if (CommandName === 'ping') {
      const output = reply('Pong.')
      console.log(output)
    }
  })