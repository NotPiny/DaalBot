const { ActivityType } = require('discord.js')
const daalbot = require('../../daalbot.js')

module.exports = {
    name: 'status',
    description: 'Change the status of the bot',
    category: 'Pen',

    slash: true,
    ownerOnly: true,

    options: [
        {
            name: 'status',
            description: 'The new status',
            type: 'STRING',
            required: true
        },
        {
            name: 'type',
            description: 'The type of status (piny.tv/ActivityTypes)',
            type: 'STRING',
            required: false,
        }
    ],

    callback: ({ interaction }) => {
        const newActivity = interaction.options.getString('status')
        const type = parseInt(interaction.options.getString('type')) || ActivityType.Custom

        daalbot.client.user.setActivity(newActivity, { type: type })

        interaction.reply(`Successfully changed status to "${newActivity}"`, { ephemeral: true })
    }
}