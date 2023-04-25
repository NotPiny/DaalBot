const client = require('../../client.js');
const DJS = require('discord.js');

client.on('interactionCreate', async interaction => {
    if (!interaction.isStringSelectMenu()) return;
	
    if (interaction.customId === 'poll_type') {
        const pollType = interaction.values[0]

        const modal = new DJS.ModalBuilder()
        modal.setTitle('Poll')
        modal.setCustomId(`poll_modal_${pollType}`)

        const question = new DJS.TextInputBuilder()
            .setCustomId('poll_modal_question')
            .setPlaceholder('What is your question?')
            .setRequired(true)
            .setStyle(DJS.TextInputStyle.Short)
            .setLabel('Question')

        const row1 = new DJS.ActionRowBuilder()
        row1.addComponents(question)

        const timeLimit = new DJS.TextInputBuilder()
            .setCustomId('poll_modal_time_limit')
            .setPlaceholder('How long should the poll last?')
            .setRequired(true)
            .setStyle(DJS.TextInputStyle.Short)
            .setLabel('Time Limit (Generator: piny.tv/timestampGen)')

        const row2 = new DJS.ActionRowBuilder()
        row2.addComponents(timeLimit)

        modal.addComponents(row1, row2)

        if (pollType === 'yes-no') {
            interaction.showModal(modal)
        } else if (pollType === 'multiple-choice') {
            interaction.showModal(modal)
        }
    }
})