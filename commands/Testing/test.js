const daalbot = require('../../daalbot');

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
            return `# Output \n\`\`\`\nSent message\n\`\`\``;
        } catch (err) {
            return `# Error\n\`\`\`\n${err}\n\`\`\``;
        }
    },
}