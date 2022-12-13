import client from '../client';
import Discord from 'discord.js';

client.on('interactionCreate', interaction => {
    if (interaction.isChatInputCommand()) {
        if (interaction.commandName === 'customcommand') {
            const { options } = interaction;

            const mode = options.getSubcommand();

            if (mode === 'create') {
                const modal = new Discord.ModalBuilder().setCustomId('customcommand-create');

                modal.setTitle('Create a custom command');
                
                const name = new Discord.TextInputBuilder()
                .setCustomId('name')
                .setLabel('Name')
                .setPlaceholder('Command name')
                .setStyle(Discord.TextInputStyle.Short)
                .setRequired(true);

                const description = new Discord.TextInputBuilder()
                .setCustomId('description')
                .setLabel('Description')
                .setPlaceholder('Command description')
                .setStyle(Discord.TextInputStyle.Short)
                .setRequired(true);

                const response = new Discord.TextInputBuilder()
                .setCustomId('response')
                .setLabel('Response')
                .setPlaceholder('Response (Must be raw JSON)')
                .setStyle(Discord.TextInputStyle.Paragraph)
                .setRequired(true);

                const row1 = new Discord.ActionRowBuilder().addComponents(name);
                const row2 = new Discord.ActionRowBuilder().addComponents(description);
                const row3 = new Discord.ActionRowBuilder().addComponents(response);

                modal.addComponents
            }
        }
    }
})