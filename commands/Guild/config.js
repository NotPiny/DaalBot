const daalbot = require('../../daalbot.js');

module.exports = {
    name: 'config',
    description: 'Configure the bot for your server',
    category: 'Guild',

    guildOnly: true,
    
    slash: true,
    permissions: ['MANAGE_SERVER'],

    options: [
        {
            name: 'channels',
            description: 'Configure the channels for the bot',
            type: 'SUB_COMMAND_GROUP',
            options: [
                {
                    name: 'levels',
                    description: 'Configure the channel for level up messages',
                    type: 'SUB_COMMAND',
                    options: [
                        {
                            name: 'channel',
                            description: 'The channel to send level up messages to',
                            type: 'CHANNEL',
                            channel_types: [0],
                            required: true
                        }
                    ]
                },
                {
                    name: 'logs',
                    description: 'Set the channel for the bot to send alerts to',
                    type: 'SUB_COMMAND',
                    options: [
                        {
                            name: 'channel',
                            description: 'The channel to send alerts to',
                            type: 'CHANNEL',
                            channel_types: [0],
                            required: true
                        }
                    ]
                }
            ]
        }
    ],

    

    callback: async ({ interaction }) => {
        const subCommandGroup = interaction.options.getSubcommandGroup();
        const subCommand = interaction.options.getSubcommand();

        if (subCommandGroup === 'channels') {
            const channel = interaction.options.getChannel('channel');

            if (subCommand === 'levels') {
                // Set the channel for level up messages
                await daalbot.db.setChannel(interaction.guild.id, 'levels', channel.id);

                // Send a confirmation message
                await interaction.reply(`Level up messages will now be sent to ${channel}`);
            } else if (subCommand === 'logs') {
                // Set the channel for alerts
                await daalbot.db.setChannel(interaction.guild.id, 'alerts', channel.id);

                // Send a confirmation message
                await interaction.reply(`Alerts for daalbot will now be sent to ${channel}`);
            }
        }
    }
}