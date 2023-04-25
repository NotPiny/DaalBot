const DJS = require('discord.js');
const client = require('../client.js');

client.on('ready', () => {
    client.application.commands.create({
        name: 'poll',
        description: 'Create a poll',
        type: DJS.ApplicationCommandType.ChatInput
    })
})