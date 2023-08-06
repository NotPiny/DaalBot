const daalbot = require('../daalbot.js');
const DJS = require('discord.js');
const client = require('../client.js');
const fs = require('fs');
const path = require('path');

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
                // Fetch the current silent user config from the database
                const silentUserConfig = fs.readFileSync(path.resolve(`./db/xp/silent.users`), 'utf8');

                // Create the embed
                let embed = new DJS.MessageEmbed()

                // Check if the user is already in the silent user config
                if (silentUserConfig.includes(interaction.user.id)) {
                    // Remove the user from the silent user config
                    fs.writeFileSync(path.resolve(`./db/xp/silent.users`), silentUserConfig.replace(`${interaction.user.id}\n`, ''));

                    // Set the embed
                    embed
                        .setTitle('Unmuted Level Up Messages')
                        .setDescription(`You will now be pinged when you level up.`)
                        .setTimestamp();
                } else {
                    // Add the user to the silent user config
                    fs.appendFileSync(path.resolve(`./db/xp/silent.users`), `${interaction.user.id}\n`);

                    // Set the embed
                    embed
                        .setTitle('Muted Level Up Messages')
                        .setDescription(`You will no longer be pinged when you level up.`)
                        .setTimestamp();
                }

                interaction.update({
                    content: null,
                    embeds: [embed],
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