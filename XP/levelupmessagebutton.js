const daalbot = require('../daalbot.js');
const DJS = require('discord.js');
const client = require('../client.js');

client.on('interactionCreate', async interaction => {
    if (interaction.isButton()) {
        if (interaction.customId === 'levelUpMenu') {
            const embed = new DJS.MessageEmbed()
                .setTitle('Menu')
                .setDescription('Please pick an option from the dropdown below.')
                .setTimestamp();

            const row = new DJS.MessageActionRow()

            const dropdown = new DJS.MessageSelectMenu()
                .setCustomId('levelUpMenuDropdown')
                .setPlaceholder('Select an option')
                .addOptions([
                    {
                        label: 'View XP',
                        description: 'View your XP',
                        value: 'viewxp'
                    },
                    {
                        label: 'Mute Level Up Messages',
                        description: 'Disables pinging you when you level up',
                        value: 'mutelevelupmessages'
                    },
                    {
                        label: 'How to earn XP',
                        description: 'View how to earn XP',
                        value: 'howtoearnxp'
                    }
                ])

            row.addComponents(dropdown);

            interaction.reply({
                embeds: [embed],
                components: [row],
                ephemeral: true
            })
        } else if (interaction.customId === 'levelUpMenuBack') {
            const embed = new DJS.MessageEmbed()
                .setTitle('Menu')
                .setDescription('Please pick an option from the dropdown below.')
                .setTimestamp();

            const row = new DJS.MessageActionRow()

            const dropdown = new DJS.MessageSelectMenu()
                .setCustomId('levelUpMenuDropdown')
                .setPlaceholder('Select an option')
                .addOptions([
                    {
                        label: 'View XP',
                        description: 'View your XP',
                        value: 'viewxp'
                    },
                    {
                        label: 'Mute Level Up Messages',
                        description: 'Disables pinging you when you level up',
                        value: 'mutelevelupmessages'
                    },
                    {
                        label: 'How to earn XP',
                        description: 'View how to earn XP',
                        value: 'howtoearnxp'
                    }
                ])

            row.addComponents(dropdown);

            interaction.update({
                content: null,
                embeds: [embed],
                components: [row],
                ephemeral: true
            })
        }
    } else if (interaction.isSelectMenu()) {
        if (interaction.customId === 'levelUpMenuDropdown') {
            const option = interaction.values[0];

            const backBtn = new DJS.MessageButton()
                .setLabel('Back')
                .setStyle('DANGER')
                .setCustomId('levelUpMenuBack')
                .setEmoji('⬅');

            const backbuttonrow = new DJS.MessageActionRow()
                .addComponents(backBtn);

            if (option === 'viewxp') {
                interaction.update({
                    content: `We cant make buttons link to commands yet so run /level to view your XP`,
                    embeds: [],
                    components: [backbuttonrow],
                    ephemeral: true
                })
            } else if (option === 'mutelevelupmessages') {
                // TODO: Add mute level up messages
                interaction.update({
                    content: `This feature is not yet implemented`,
                    embeds: [],
                    components: [backbuttonrow],
                    ephemeral: true
                })
            } else if (option === 'howtoearnxp') {
                const embed = new DJS.MessageEmbed()
                    .setTitle('How to earn XP')
                    .setDescription(`You can earn XP by doing the following:`)
                    .addFields({
                        name: 'Sending messages',
                        value: 'You can earn XP by sending messages in any channel. You will earn 1-10 XP per message.'
                    });

                interaction.update({
                    content: null,
                    embeds: [embed],
                    components: [backbuttonrow],
                    ephemeral: true
                })
            }
        }
    }
})