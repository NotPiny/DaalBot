const fs = require('fs');
const client = require('../../client.js');
const { botPath } = require('../../config.json');

client.on('interactionCreate', interaction => {
    if (!interaction.isCommand) return;
    const { commandName, options } = interaction
    fs.writeFileSync(`${botPath}/latest.command`, commandName);
})