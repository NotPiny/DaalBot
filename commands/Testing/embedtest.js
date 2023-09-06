const daalbot = require('../../daalbot.js')
const Discord = require('discord.js')

module.exports = {
    name: 'embedtest',
    description: 'Super cool test command for embeds',
    category: 'Testing',

    type: 'SLASH',
    testOnly: true,

    callback: async ({ interaction }) => {
        // /**
        //  * @type {Discord.CommandInteraction}
        //  */
        // const interaction = interaction;

        const row = new Discord.ActionRowBuilder()

        const dropdown = new Discord.StringSelectMenuBuilder()
            .setCustomId('embed_builder_dropdown')
            .setPlaceholder('Select an option')
            .addOptions([
                {
                    label: 'Title',
                    description: 'Set the title of the embed',
                    value: 'title'
                },
                {
                    label: 'Description',
                    description: 'Set the description of the embed',
                    value: 'description'
                }
            ])
            .setMaxValues(1)
            .setMinValues(1)

        row.addComponents(dropdown)

        interaction.reply({
            content: 'Please select one of the options below to unlock the other options.',
            // components: [row],
            ephemeral: true
        })
    }
}