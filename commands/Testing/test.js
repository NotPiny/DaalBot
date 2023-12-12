const daalbot = require('../../daalbot');
const DJS = require('discord.js');
const execSync = require('child_process').execSync;
const config = require('../../config.json')
const path = require('path');

module.exports = {
    category: 'Testing',
    description: 'This command does stuff sometimes.',
  
    slash: true,
    testOnly: true,
    guildOnly: false,

    options: [
        {
            name: 'attachment',
            description: 'attachment',
            type: 'ATTACHMENT',
            required: false
        },
        {
            name: 'string',
            description: 'string',
            type: 'STRING',
            required: false
        },
        {
            name: 'number',
            description: 'number',
            type: 'NUMBER',
            required: false
        },
        {
            name: 'boolean',
            description: 'boolean',
            type: 'BOOLEAN',
            required: false
        },
        {
            name: 'user',
            description: 'user',
            type: 'USER',
            required: false
        },
        {
            name: 'channel',
            description: 'channel',
            type: 'CHANNEL',
            required: false
        },
        {
            name: 'role',
            description: 'role',
            type: 'ROLE',
            required: false
        }
    ],

    callback: async({interaction}) => {
        try {
            const message = await interaction.channel.messages.cache.get(interaction.options.getString('string'));
            return `# Output \n\`\`\`json\n${JSON.stringify(message, null, 4)}\n\`\`\``;
        } catch (err) {
            return `# Error\n\`\`\`\n${err}\n\`\`\``;
        }
    },
}