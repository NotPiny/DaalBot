const daalbot = require('../../daalbot.js');
module.exports = {
    name: 'twitter',
    description: 'Modify the twitter feed or whatever you should not see this description',
    category: 'Utility',
    permissions: ['ADMINISTRATOR'],
    slash: true,
    testOnly: true,
    guildOnly: true,

    options: [
        {
            name: 'add',
            description: 'SUBCOMMANDGROUP',
            type: 'SUB_COMMAND_GROUP',
            options: [
                {
                    name: 'channel',
                    description: 'Adds a twitter webhook to a channel',
                    type: 'SUB_COMMAND',
                    options: [
                        {
                            name: 'channel',
                            description: 'The channel to add the webhook to',
                            type: 'CHANNEL',
                            required: true
                        }
                    ]
                },
                {
                    name: 'feed',
                    description: 'Adds a twitter feed to the webhook',
                    type: 'SUB_COMMAND',
                    options: [
                        {
                            name: 'feed',
                            description: 'The twitter feed to add the user to',
                            type: 'CHANNEL',
                            required: true
                        },
                        {
                            name: 'user',
                            description: 'The twitter user to add to the feed',
                            type: 'STRING',
                            required: true
                        }
                    ]
                }
            ]
        }
    ],

    callback: async ({ interaction }) => {
        const subCommandGroup = await interaction.options.getSubcommandGroup();
        const subCommand = await interaction.options.getSubcommand();

        if (subCommandGroup === 'add') {
            if (subCommand === 'channel') {
                const OPTchannel = await interaction.options.getChannel('channel');
                const channel = daalbot.getChannel(interaction.guild.id, OPTchannel.id);

                if (channel == undefined) return 'Channel not found';
                if (channel == 'Server not found.') return 'There was an error finding the server.';
                if (channel == 'Channel not found.') return 'There was an error finding the channel.';
                
                const webhook = await channel.createWebhook('Twitter', {
                    avatar: 'https://pinymedia.web.app/Daalbot.png'
                });

                console.log(webhook);
            }
        }
    }
}