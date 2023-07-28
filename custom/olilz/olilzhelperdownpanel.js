const client = require('../../client.js');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
require('dotenv').config();
const daalbot = require('../../daalbot.js')

client.on('messageCreate', async(message) => {
    if (message.guild.id !== '1015322440152383539') return;

    if (message.content === '$summonolilzhelperdownpanel') {
        if (message.author.id !== '900126154881646634') return;
        
        const embed = new MessageEmbed()
            .setTitle('Bot Status')
            .setDescription('Please use the retrospective buttons to set the bots status and send a status message to <#1123342391395495946>.')
            .setColor('GREEN')

        const row = new MessageActionRow()

        const online = new MessageButton()
            .setCustomId('oh-downtimepanel-online')
            .setLabel('Online')
            .setStyle('SUCCESS')

        const offline = new MessageButton()
            .setCustomId('oh-downtimepanel-offline')
            .setLabel('Offline')
            .setStyle('DANGER')

        const notresponding = new MessageButton()
            .setCustomId('oh-downtimepanel-notresponding')
            .setLabel('Not / Slow Responding')
            .setStyle('PRIMARY')

        const custom = new MessageButton()
            .setCustomId('oh-downtimepanel-custom')
            .setLabel('Custom')
            .setStyle('SECONDARY')

        row.addComponents(online, offline, notresponding, custom)

        message.channel.send({ embeds: [embed], components: [row] })
    }
})

client.on('interactionCreate', async(interaction) => {
    if (interaction.guild.id !== '1015322440152383539') return;

    if (interaction.isButton()) {
        if (interaction.customId.startsWith('oh-downtimepanel-')) {
            const channel = daalbot.getChannel(interaction.guild.id, '1123342391395495946')

            if (interaction.customId === 'oh-downtimepanel-online') {
                const embed = new MessageEmbed()
                    .setTitle('Bot is performing normally')
                    .setDescription('The bot is now online and responding in a timely manner.')
                    .setColor('GREEN')

                channel.send({
                    content: '<@&1123649453623091230>',
                    embeds: [embed]
                })

                interaction.reply({
                    content: 'Status set.',
                    ephemeral: true
                })
            } else if (interaction.customId === 'oh-downtimepanel-offline') {
                const embed = new MessageEmbed()
                    .setTitle('Bot is offline')
                    .setDescription('The bot is now offline and is not responding.')
                    .setColor('RED')

                channel.send({
                    content: '<@&1123649453623091230>',
                    embeds: [embed]
                })

                interaction.reply({
                    content: 'Status set.',
                    ephemeral: true
                })
            } else if (interaction.customId === 'oh-downtimepanel-notresponding') {
                const embed = new MessageEmbed()
                    .setTitle('Bot is not responding')
                    .setDescription('The bot is online but is not responding in a timely manner.')
                    .setColor('YELLOW')

                channel.send({
                    content: '<@&1123649453623091230>',
                    embeds: [embed]
                })

                interaction.reply({
                    content: 'Status set.',
                    ephemeral: true
                })
            } else if (interaction.customId === 'oh-downtimepanel-custom') {
                // Get the current timestamp in milliseconds
                const currentTimestamp = Date.now();

                // Add 30 seconds (30,000 milliseconds) to the current timestamp
                const futureTimestamp = currentTimestamp + 30 * 1000;

                // Convert the future timestamp to a Discord timestamp string
                const discordTimestamp = `<t:${Math.floor(futureTimestamp / 1000)}:R>`;
                
                await interaction.reply({
                    content: `Please enter a custom status message. (expires ${discordTimestamp})`,
                    ephemeral: true
                })

                const filter = m => m.author.id === interaction.user.id;

                try {
                    const messagesCollected = await interaction.channel.awaitMessages({ filter: filter, max: 1, time: 30000, errors: ['time'] })

                    const message = messagesCollected.first()

                    const embed = new MessageEmbed()
                        .setTitle('Custom Status Message')
                        .setDescription(`The bot is now online with the custom status message: \`${message.content}\``)
                        .setColor('BLUE')

                    channel.send({
                        content: '<@&1123649453623091230>',
                        embeds: [embed]
                    })

                    message.delete();

                    interaction.editReply({
                        content: 'Custom status message set.',
                        ephemeral: true
                    })
                } catch (error) {
                    interaction.update({
                        content: 'You did not enter a custom status message in time.',
                    })
                }
            }
        }
    }
})