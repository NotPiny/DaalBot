require('./creation.js'); // Create the commands

const client = require('../client');

client.on('interactionCreate', async interaction => {
    if (interaction.isMessageContextMenuCommand()) {
        // MessageContextMenuCommandInteraction
        require(`./snippets/message/${interaction.commandId}.js`)(interaction);
    }
})