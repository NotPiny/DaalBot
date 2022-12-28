module.exports = {
    name: 'customcommand',
    description: 'Modify the custom commands for your server.',
    category: 'Guild',

    options: [
        {
            name: 'create',
            description: 'Create a custom command.',
            type: 'SUB_COMMAND',
        }
    ],

    permissions: ['ADMINISTRATOR'],
    testOnly: true,
    guildOnly: true,
    slash: true,

    callback: () => {
        console.log('Custom command command executed.');
    }
}