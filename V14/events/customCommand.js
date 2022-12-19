const client = require('../client.js');
const DJS = require('discord.js');
const path = require('path');

client.on('interactionCreate', async(interaction) => {
    if (interaction.isChatInputCommand()) {
        if (interaction.commandName == 'customcommand') {
            const subcommand = interaction.options.getSubcommand();

            if (subcommand == 'create') {
                const modal = new DJS.ModalBuilder()
                    .setTitle('Create a custom command')
                    .setCustomId('createcustomcommand')
                    
                const nameInput = new DJS.TextInputBuilder()
                    .setCustomId('name')
                    .setPlaceholder('Name')
                    .setMaxLength(10)
                    .setRequired(true)
                    .setStyle(DJS.TextInputStyle.Short);

                const descriptionInput = new DJS.TextInputBuilder()
                    .setCustomId('description')
                    .setPlaceholder('Description')
                    .setMaxLength(25)
                    .setRequired(true)
                    .setStyle(DJS.TextInputStyle.Short);

                const responseInput = new DJS.TextInputBuilder()
                    .setCustomId('response')
                    .setPlaceholder('Response')
                    .setMaxLength(500)
                    .setRequired(true)
                    .setStyle(DJS.TextInputStyle.Paragraph);

                const row1 = new DJS.ActionRowBuilder().addComponents(nameInput);
                const row2 = new DJS.ActionRowBuilder().addComponents(descriptionInput);
                const row3 = new DJS.ActionRowBuilder().addComponents(responseInput);

                modal.addComponents(row1, row2, row3);

                await interaction.showModal(modal);
            }
        }
    } else if (interaction.isModalSubmit()) {
        if (interaction.customId == 'createcustomcommand') {
            const name = interaction.fields.getTextInputValue('name');
            const description = interaction.fields.getTextInputValue('description');
            const response = interaction.fields.getTextInputValue('response');

            await interaction.reply({
                content: `Name: ${name}\nDescription: ${description}\nResponse: ${response}`,
                ephemeral: true
            })
        }
    }
})