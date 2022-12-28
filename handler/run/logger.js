const client = require('../../client');

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand) return;
    const { commandName, options } = interaction
    const Interaction = interaction
    
    console.log(`${interaction.user.tag} ran ${commandName}`); // Logs the command name and user who ran it
  })