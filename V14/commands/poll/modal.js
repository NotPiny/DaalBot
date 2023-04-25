const client = require('../../client.js');
const DJS = require('discord.js');
const fs = require('fs');
const path = require('path');

client.on('interactionCreate', async interaction => {
    if (!interaction.isModalSubmit()) return;

    const { customId } = interaction;

    if (customId.startsWith('poll_modal')) {
        const pollType = customId.split('_')[2];
        const question = interaction.fields.getTextInputValue('poll_modal_question');
        const timeLimit = interaction.fields.getTextInputValue('poll_modal_time_limit');

        const embed = new DJS.EmbedBuilder()
            .setThumbnail('https://pinymedia.web.app/daalbot/Poll.png')
            .setAuthor({
                name: 'Poll'
            })
            .setTitle(question + ` (ends ${timeLimit})`)

        if (pollType === 'yes-no') {
            embed.setDescription('Select <:GreenTick:1093851205639360603> for Yes and <:RedTick:1093851092120506469> for No.')

            const row = new DJS.ActionRowBuilder()
            
            const yes = new DJS.ButtonBuilder()
                .setCustomId('poll_yes')
                .setLabel('Yes')
                .setStyle(DJS.ButtonStyle.Success)
                .setEmoji('1093851205639360603')

            const no = new DJS.ButtonBuilder()
                .setCustomId('poll_no')
                .setLabel('No')
                .setStyle(DJS.ButtonStyle.Danger)
                .setEmoji('1093851092120506469')

            row.addComponents(yes, no)

            embed.setFooter({
                text: `Yes: 0 | No: 0`
            })

            const pollMessage = await interaction.channel.send({
                embeds: [embed],
                components: [row]
            })

            interaction.reply({
                content: 'Poll created!',
                ephemeral: true
            })

            fs.appendFileSync(path.resolve(`./temp/${pollMessage.id}.poll`), '0,0')
        }
    }
})