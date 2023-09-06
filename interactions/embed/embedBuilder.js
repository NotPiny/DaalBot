const client = require('../../client.js');
const Discord = require('discord.js');

client.on('interactionCreate', async interaction => {
    if (!interaction.isStringSelectMenu()) return;

    if (interaction.customId === 'embed_builder_dropdown') {
        const option = interaction.values[0];

        if (option == 'title') {
            const modal = new Discord.ModalBuilder()
                .setTitle('Embed Builder')
                .setCustomId('embed_builder_config_modal')
                
            const row = new Discord.ActionRowBuilder()

            const input = new Discord.TextInputBuilder()
                .setCustomId('embed_builder_title_input')
                .setPlaceholder('Enter the title of the embed')
                .setMinLength(1)
                .setMaxLength(256)
                .setLabel('Title')

            row.addComponents(input)
            modal.addComponents(row)

            await interaction.showModal(modal)
        }
    }
})