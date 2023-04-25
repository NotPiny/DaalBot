const client = require('../../client.js');
const DJS = require('discord.js');

client.on('interactionCreate', async interaction => {
    if (interaction.type === DJS.InteractionType.ApplicationCommand) {
        if (interaction.commandName === 'poll') {
            const embed = new DJS.EmbedBuilder()
                .setTitle('What kind of poll do you want to create?')
                .setDescription('Select the poll type you want to create from the list below.')
                .setColor('Aqua')

            const row = new DJS.ActionRowBuilder()
            
            const dropdown = new DJS.StringSelectMenuBuilder()
                .setCustomId('poll_type')
                .setPlaceholder('Select a poll type')
                .addOptions([
                    {
                        label: 'Yes/No',
                        description: 'Has two options: Yes and No',
                        value: 'yes-no'
                    },
                    {
                        label: 'Multiple Choice',
                        description: 'Has multiple options that can be selected',
                        value: 'multiple-choice'
                    }
                ])
                .setMaxValues(1)
                .setMinValues(1)

            row.addComponents(dropdown)

            interaction.reply({
                embeds: [embed],
                components: [row],
                ephemeral: true
            })
        }
    }
})