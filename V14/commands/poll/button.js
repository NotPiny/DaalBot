const client = require('../../client.js');
const DJS = require('discord.js');
const fs = require('fs');
const path = require('path');
const daalbot = require('../../../daalbot.js');

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId.startsWith('poll')) {
        if (!fs.existsSync(path.resolve(`./temp/${interaction.message.id}.poll`))) {
            return await interaction.reply({
                content: 'Error: Invalid poll!',
                ephemeral: true
            })
        }

        const buttonType = interaction.customId.replace('poll_', '');

        const pollTimeLimit = interaction.message.embeds[0].title.split('<t:')[1].replace(':R>', '');
        const currentTime = Math.floor(Date.now() / 1000);

        if (pollTimeLimit < currentTime) {
            await interaction.reply({
                content: 'This poll has ended!',
                ephemeral: true
            })

            const message = interaction.message;

            const yes = new DJS.ButtonBuilder()
                .setCustomId('poll_yes')
                .setLabel('Yes')
                .setStyle(DJS.ButtonStyle.Success)
                .setEmoji('1093851205639360603')
                .setDisabled(true)

            const no = new DJS.ButtonBuilder()
                .setCustomId('poll_no')
                .setLabel('No')
                .setStyle(DJS.ButtonStyle.Danger)
                .setEmoji('1093851092120506469')
                .setDisabled(true)

            const row = new DJS.ActionRowBuilder()
                .addComponents(yes, no)

            const embed = new DJS.EmbedBuilder()
                .setAuthor({
                    name: 'Poll',
                    iconURL: 'https://pinymedia.web.app/daalbot/Poll.png'
                })
                .setTitle(message.embeds[0].title.replace('(ends', '(ended'))
                .setDescription('This poll has ended!')
                .setFooter({
                    text: message.embeds[0].footer.text
                })

            return message.edit({
                embeds: [embed],
                components: [row]
            })
        } else {
            const pollData = fs.readFileSync(path.resolve(`./temp/${interaction.message.id}.poll`), 'utf-8').split(',');
            
            function updateEmbed() {
                const message = interaction.message;

                const embed = new DJS.EmbedBuilder()
                    .setThumbnail('https://pinymedia.web.app/daalbot/Poll.png')
                    .setAuthor({
                        name: 'Poll'
                    })
                    .setTitle(message.embeds[0].title)
                    .setDescription(message.embeds[0].description)
                    .setFooter({
                        text: `Yes: ${pollData[0]} | No: ${pollData[1]}`
                    })

                message.edit({
                    embeds: [embed]
                })
            }

            if (fs.existsSync(path.resolve(`./temp/${interaction.message.id}_${interaction.user.id}.poll`))) {
                const userVote = fs.readFileSync(path.resolve(`./temp/${interaction.message.id}_${interaction.user.id}.poll`), 'utf-8');

                if (userVote === buttonType) {
                    return await interaction.reply({
                        content: 'You have already voted for this option!',
                        ephemeral: true
                    })
                } else {
                    if (buttonType === 'yes') {
                        pollData[0] = parseInt(pollData[0]) + 1;
                        pollData[1] = parseInt(pollData[1]) - 1;
                    } else if (buttonType === 'no') {
                        pollData[0] = parseInt(pollData[0]) - 1;
                        pollData[1] = parseInt(pollData[1]) + 1;
                    }

                    updateEmbed();

                    daalbot.fs.write(path.resolve(`./temp/${interaction.message.id}.poll`), pollData.join(','));
                    daalbot.fs.write(path.resolve(`./temp/${interaction.message.id}_${interaction.user.id}.poll`), buttonType);

                    interaction.reply({
                        content: 'Vote changed!',
                        ephemeral: true
                    })
                }
            } else {
                if (buttonType === 'yes') {
                    pollData[0] = parseInt(pollData[0]) + 1;
                } else if (buttonType === 'no') {
                    pollData[1] = parseInt(pollData[1]) + 1;
                }

                daalbot.fs.write(path.resolve(`./temp/${interaction.message.id}.poll`), pollData.join(','));

                updateEmbed();

                interaction.reply({
                    content: 'Vote recorded!',
                    ephemeral: true
                })

                fs.appendFileSync(path.resolve(`./temp/${interaction.message.id}_${interaction.user.id}.poll`), buttonType)
            }
        }
    }
})