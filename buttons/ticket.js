const client = require('../client.js');
const config = require('../config.json');
const daalbot = require('../daalbot.js');
const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');

client.on('interactionCreate', async (interaction) => {
    try {
    if (interaction.isButton()) {
        try {
        if (interaction.customId == 'create_ticket') {
            if (fs.existsSync(path.resolve(`./db/tickets/${interaction.guild.id}/blacklist/${interaction.user.id}.txt`))) {
                return await interaction.reply({
                    content: `You cannot create a ticket in this server!`,
                    ephemeral: true
                })
            }

            // Check if the server has any tickets free
            if (fs.readdirSync(path.resolve(`./db/tickets/${interaction.guild.id}/`)).length / 2 >= 25) {
                // if (interaction.user.id === interaction.guild.ownerId) {
                //     return await interaction.reply({
                //         content: `This server has reached the maximum amount of tickets. You can upgrade to DaalBot Premium to increase the limit.`,
                //         ephemeral: true
                //     })
                // } else {
                    return await interaction.reply({
                        content: `This server has reached the maximum amount of tickets. Please wait until a ticket is closed to open a new one.`,
                        ephemeral: true
                    })
                // }
            }

            if (fs.existsSync(path.resolve(`./db/logging/${interaction.guild.id}/TICKETCREATE.enabled`))) {
                const enabled = fs.readFileSync(path.resolve(`./db/logging/${interaction.guild.id}/TICKETCREATE.enabled`), 'utf8');
                if (enabled == 'true') {
                    if (!fs.existsSync(`./db/logging/${interaction.guild.id}/channel.id`)) return;

                    const channelID = fs.readFileSync(path.resolve(`./db/logging/${interaction.guild.id}/channel.id`), 'utf8');
                    const logChannel = client.channels.cache.get(channelID);

                    const embed = new Discord.EmbedBuilder()
                        .setTitle('Ticket Created')
                        .setDescription(`User: ${interaction.user.tag}\nID: ${interaction.user.id}`)
                        .setThumbnail('https://pinymedia.web.app/daalbot/embed/thumbnail/logs/Ticket.png')
                        .setColor('#57F28D')
                        .setTimestamp()

                    logChannel.send({
                        content: `Ticket Created`,
                        embeds: [embed]
                    })
                }
            }

            const ticketCategory = daalbot.getChannel(interaction.guild.id, fs.readFileSync(`${config.botPath}/db/tickets/${interaction.guild.id}.category`, 'utf8'));
            if (!ticketCategory) return interaction.reply({ content: 'The ticket category is not set up.', ephemeral: true });

            // Check the ticket amount
            if (!fs.existsSync(`${config.botPath}/db/tickets/${interaction.guild.id}/`)) {
                fs.mkdirSync(`${config.botPath}/db/tickets/${interaction.guild.id}/`);
            }
            let ticketFiles = fs.readdirSync(`${config.botPath}/db/tickets/${interaction.guild.id}/`);
            let ticketAmount = 0;
            ticketFiles.forEach(file => {
                if (file.endsWith('.ticket')) {
                    ticketAmount++;
                }
            });
            ticketAmount++;
            fs.appendFileSync(`${config.botPath}/db/tickets/${interaction.guild.id}/${ticketAmount}.ticket`, `${interaction.user.id}`);

            const ticketChannel = await interaction.guild.channels.create(`ticket-${ticketAmount}`, {
                type: 'GUILD_TEXT',
                parent: ticketCategory,
                permissionOverwrites: [
                    {
                        id: interaction.guild.roles.everyone,
                        deny: ['VIEW_CHANNEL']
                    },
                    {
                        id: interaction.user.id,
                        allow: ['VIEW_CHANNEL']
                    }
                ]
            })

            const permsFolder = path.resolve(`./db/tickets/`);

            if (fs.existsSync(`${permsFolder}/${interaction.guild.id}.permissions`)) {
                const permissions = fs.readFileSync(`${permsFolder}/${interaction.guild.id}.permissions`, 'utf8').split('\n');

                for (let i = 0; i < permissions.length; i++) {
                    const data = permissions[i].split(':');
                    const role = daalbot.getRole(interaction.guild.id, data[0]);
                    if (role == 'Role not found.') continue;
                    if (role == 'Server not found.') continue;
                    if (role == undefined) continue;
                    if (data[1] == 'allow') {
                        ticketChannel.permissionOverwrites.edit(role, {
                            VIEW_CHANNEL: true
                        })
                    } else { continue }
                }
            }

            const attentionMessage = await ticketChannel.send(`<@${interaction.user.id}>`);

            attentionMessage.delete();

            if (interaction.guild.id != '973711816226136095') {
                const ticketEmbed = new Discord.EmbedBuilder()
                    .setTitle(`Ticket - ${interaction.message.embeds[0].title}`)
                    .setDescription(`Hello ${interaction.user.username}, welcome to your ticket\nSomeone will be with you shortly`)
                    .setColor('#9B5AB4')
                    .setTimestamp();

                const row = new Discord.ActionRowBuilder()

                const closeTicketButton = new Discord.ButtonBuilder()
                    .setCustomId('close_ticket')
                    .setLabel('Close')
                    .setStyle(Discord.ButtonStyle.Danger)
                    .setEmoji('🔒')

                row.addComponents(closeTicketButton);

                const ticketMessage = await ticketChannel.send({ embeds: [ticketEmbed], components: [row] });
                fs.appendFileSync(`${config.botPath}/db/tickets/${interaction.guild.id}/${ticketAmount}.ticket`, `\n${ticketMessage.id}\n${ticketChannel.id}`);
            }

            interaction.reply({ content: 'Your ticket has been created.', ephemeral: true })
            .then(() => {
                // Everything is fine :)
            })
            .catch((err) => {
                return console.error(err);
            })
        }

        if (interaction.customId == 'close_ticket') {
            const ticketChannel = daalbot.getChannel(interaction.guild.id, interaction.channel.id);
            if (!ticketChannel) return interaction.reply({ content: 'Something went wrong and we were unable to find the ticket channel.', ephemeral: true });

            ticketChannel.setName(`closed-${ticketChannel.name.replace('ticket-', '')}`);

            const ticketFiles = fs.readdirSync(path.resolve(`./db/tickets/${interaction.guild.id}/`));

            const ticketID = ticketChannel.name.split('-')[1];

            fs.appendFileSync(path.resolve(`./db/tickets/${interaction.guild.id}/${ticketID}.txt`), `\n--Ticket closed by ${interaction.user.tag} / ${interaction.user.id}--\n`);

            const ticketMessage = await interaction.channel.messages.fetch(fs.readFileSync(path.resolve(`./db/tickets/${interaction.guild.id}/${ticketID}.ticket`), 'utf8').split('\n')[1]);

            const row = new Discord.ActionRowBuilder()

            const openTicketButton = new Discord.ButtonBuilder()
                .setCustomId('open_ticket')
                .setLabel('Open')
                .setStyle(Discord.ButtonStyle.Success)
                .setEmoji('🔓')

            row.addComponents(openTicketButton);

            ticketMessage.edit({ components: [row] })

            if (ticketChannel.type != Discord.ChannelType.GuildText) return interaction.reply({ content: 'Something went wrong and we were unable to find the ticket channel.', ephemeral: true });

            const { Permissions } = require('discord.js');

            client.channels.cache.get(ticketChannel.id).permissionOverwrites.edit(interaction.user, {
                SEND_MESSAGES: false,
            })

            client.channels.cache.get(ticketChannel.id).permissionOverwrites.edit(interaction.guild.roles.everyone, {
                VIEW_CHANNEL: false,
                SEND_MESSAGES: false,
            })

            interaction.reply({ content: 'Your ticket has been closed.', ephemeral: true });
        }

        if (interaction.customId == 'open_ticket') {
            const ticketChannel = daalbot.getChannel(interaction.guild.id, interaction.channel.id);
            if (!ticketChannel) return interaction.reply({ content: 'Something went wrong and we were unable to find the ticket channel.', ephemeral: true });

            ticketChannel.setName(`ticket-${ticketChannel.name.replace('closed-', '')}`);

            const ticketFiles = fs.readdirSync(path.resolve(`./db/tickets/${interaction.guild.id}/`));

            const ticketID = ticketChannel.name.split('-')[1];

            fs.appendFileSync(path.resolve(`./db/tickets/${interaction.guild.id}/${ticketID}.txt`), `\n--Ticket opened by ${interaction.user.tag} / ${interaction.user.id}--\n`);

            const ticketMessage = await interaction.channel.messages.fetch(fs.readFileSync(path.resolve(`./db/tickets/${interaction.guild.id}/${ticketID}.ticket`), 'utf8').split('\n')[1]);

            const row = new Discord.ActionRowBuilder()

            const closeTicketButton = new Discord.ButtonBuilder()
                .setCustomId('close_ticket')
                .setLabel('Close')
                .setStyle(Discord.ButtonStyle.Danger)
                .setEmoji('🔒')

            row.addComponents(closeTicketButton);

            ticketMessage.edit({ components: [row] })

            client.channels.cache.get(ticketChannel.id).permissionOverwrites.edit(interaction.user, {
                SEND_MESSAGES: true,
            })

            client.channels.cache.get(ticketChannel.id).permissionOverwrites.edit(interaction.guild.roles.everyone, {
                VIEW_CHANNEL: false,
                SEND_MESSAGES: true,
            })

            interaction.reply({ content: 'Your ticket has been opened.', ephemeral: true })
        } 

        if (interaction.customId === 'cancel-ticket-purge') {
            interaction.update({ content: 'Ticket purge cancelled.', components: [], embeds: [] });
        }

        if (interaction.customId === 'confirm-ticket-purge') {
            async function wait(ms) {
                return new Promise(resolve => {
                    setTimeout(resolve, ms);
                })
            }
            const ticketFiles = fs.readdirSync(path.resolve(`./db/tickets/${interaction.guild.id}/`));

            let ticketsPurged = 0;
            let cantPurge = 0;
            let ticketsRemaining = ticketFiles.length / 2;
            
            const purgeEmbed = new Discord.EmbedBuilder()
                .setTitle('Purging began.')
                .setDescription('Please wait while we purge the tickets.')
                .setColor('#57F28D')
                .setFields([
                    {
                        name: 'Tickets purged',
                        value: '0',
                    },
                    {
                        name: 'Tickets remaining',
                        value: `${ticketsRemaining}`,
                    },
                    {
                        name: 'Tickets unable to be purged',
                        value: '0',
                    }
                ])
            
                await interaction.reply({
                    embeds: [purgeEmbed],
                    components: [],
                    ephemeral: true
                })

            ticketFiles.forEach(async(ticketFile) => {
                const ticketID = ticketFile.split('.')[0];

                const ticketFileData = fs.readFileSync(path.resolve(`./db/tickets/${interaction.guild.id}/${ticketID}.ticket`), 'utf8');

                if (ticketFile.split('.')[1] != 'txt') return; // Dont loop over tickets twice
                    
                const ticketFilePath = path.resolve(`./db/tickets/${interaction.guild.id}/${ticketID}.ticket`);
                const transcriptFilePath = path.resolve(`./db/tickets/${interaction.guild.id}/${ticketID}.txt`);

                try {
                    await wait(3000);
                    const ticketChannel = daalbot.getChannel(interaction.guild.id, ticketFileData.split('\n')[2]);

                    if (ticketChannel === 'Server not found.' || ticketChannel === 'Channel not found.') throw new Error(`Tickets: Unable to purge ticket ${ticketID} as it does not exist. (${ticketChannel}))`);
                    if (ticketChannel == undefined) throw new Error(`Tickets: Unable to purge ticket ${ticketID} as it does not exist. (undefined)`);

                    ticketChannel.delete(`Ticket purge initiated by ${interaction.user.username}`);
                    fs.unlinkSync(ticketFilePath);
                    fs.unlinkSync(transcriptFilePath);

                    ticketsPurged++;
                    ticketsRemaining--;

                    purgeEmbed.setFields([
                        {
                            name: 'Tickets purged',
                            value: `${ticketsPurged}`,
                        },
                        {
                            name: 'Tickets remaining',
                            value: `${ticketsRemaining}`,
                        },
                        {
                            name: 'Tickets unable to be purged',
                            value: `${cantPurge}`,
                        }
                    ])

                    interaction.editReply({
                        embeds: [purgeEmbed],
                    })
                } catch(err) {
                    cantPurge++;
                    ticketsRemaining--;

                    purgeEmbed.setFields([
                        {
                            name: 'Tickets purged',
                            value: `${ticketsPurged}`,
                        },
                        {
                            name: 'Tickets remaining',
                            value: `${ticketsRemaining}`,
                        },
                        {
                            name: 'Tickets unable to be purged',
                            value: `${cantPurge}`,
                        }
                    ])

                    console.warn(`Tickets > Error encountered while purging a ticket.\n${err}`);

                    interaction.editReply({
                        embeds: [purgeEmbed],
                    })
                }
              })
            }   
        } catch {
            interaction.reply({ content: 'Something went wrong and we were unable to process your request.', ephemeral: true });
        }
    }
} catch {
    console.error('Tickets > Error encountered while dealing with a request.');
    return interaction.reply({ content: 'An error occurred.', ephemeral: true });
}
})