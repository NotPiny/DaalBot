const messageOptions = [
    'deletion'
]
const settingsOptions = [
    'channel'
]
// const logSchema = require('../../models/log-schema.js');
const fs = require('fs');
function updateServerChannel(channel, server) {
    try {
    fs.writeFileSync(`../../logging/${server}/channel.id`, channel);
    return 'Settings updated!'
    } catch {
        return 'Something went wrong'
    }
}

module.exports = {
    description: 'Configures log settings for the server',
    category: 'Utility',

    testOnly: true,
    slash: true,

    options: [
        {
            name: 'message',
            description: 'Sets message logging settings for the server',
            type: 'SUB_COMMAND',
            options: [
                {
            name: 'option',
            description: `The option to modify`,
            type: 'STRING',
            required: true,
            choices: messageOptions.map((action) => ({
              name: action,
              value: action,
            })),
                },
                {
                    name: 'enabled',
                    description: 'Enables / Disables the option',
                    type: 'BOOLEAN',
                    required: true
                }
            ],
        },
        {
            name: 'settings',
            description: 'Changes logging setting for the server',
            type: 'SUB_COMMAND_GROUP',
            options: [
                {
                    name: 'log_channel',
                    description: 'Sets the channel to send log data to',
                    type: 'SUB_COMMAND',
                    options: [
                        {
                            name: 'channel',
                            description: 'The channel to send logs to',
                            type: 'CHANNEL',
                            required: true,
                        }
                    ]
                }
            ]
        }
    ],

    callback: async ( interaction ) => {
        const SubCommand = interaction.options.getSubcommand();
        const guild = interaction.guild

        if (SubCommand === 'log_channel' || SubCommand === 'channel') {
            const channel = interaction.options.getChannel('channel');
            const channelId = channel.id;
            const guildId = guild.id;

            const response = updateServerChannel(channelId, guildId)
            return {
                custom: true,
                content: response
            }
        } else {
            return 'This has not been setup yet'
        }
    }
}