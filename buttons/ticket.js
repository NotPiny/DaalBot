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


            if (fs.existsSync(path.resolve(`./db/logging/${interaction.guild.id}/TICKETCREATE.enabled`))) {
                const enabled = fs.readFileSync(path.resolve(`./db/logging/${interaction.guild.id}/TICKETCREATE.enabled`), 'utf8');
                if (enabled == 'true') {
                    if (!fs.existsSync(`./db/logging/${interaction.guild.id}/channel.id`)) return;

                    const channelID = fs.readFileSync(path.resolve(`./db/logging/${interaction.guild.id}/channel.id`), 'utf8');
                    const logChannel = client.channels.cache.get(channelID);

                    const embed = new Discord.MessageEmbed()
                        .setTitle('Ticket Created')
                        .setDescription(`User: ${interaction.user.tag}\nID: ${interaction.user.id}`)
                        .setThumbnail('https://pinymedia.web.app/daalbot/embed/thumbnail/logs/Ticket.png')
                        .setColor('GREEN')
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
            const ticketEmbed = new Discord.MessageEmbed()
                .setTitle(`Ticket - ${interaction.message.embeds[0].title}`)
                .setDescription(`Hello ${interaction.user.username}, welcome to your ticket\nSomeone will be with you shortly`)
                .setColor('PURPLE')
                .setTimestamp();

                const row = new Discord.MessageActionRow()

                const closeTicketButton = new Discord.MessageButton()
                    .setCustomId('close_ticket')
                    .setLabel('Close')
                    .setStyle('DANGER')
                    .setEmoji('🔒')

                row.addComponents(closeTicketButton);

            const ticketMessage = await ticketChannel.send({ embeds: [ticketEmbed], components: [row] });
            fs.appendFileSync(`${config.botPath}/db/tickets/${interaction.guild.id}/${ticketAmount}.ticket`, `\n${ticketMessage.id}`);
            }

            interaction.reply({ content: 'Your ticket has been created.', ephemeral: true })
            .then(() => {
                console.log(`Ticket opened by ${interaction.user.tag} in ${interaction.guild.name}`)
            })
            .catch((err) => {
                return console.log(err);
            })
        }

        if (interaction.customId == 'close_ticket') {
            const ticketChannel = daalbot.getChannel(interaction.guild.id, interaction.channel.id);
            if (!ticketChannel) return interaction.reply({ content: 'Something went wrong and we were unable to find the ticket channel.', ephemeral: true });

            ticketChannel.setName(`closed-${ticketChannel.name.replace('ticket-', '')}`);

            const ticketFiles = fs.readdirSync(path.resolve(`./db/tickets/${interaction.guild.id}/`));

            let ticketNumber = ticketFiles.length / 2;

            const ticketID = ticketChannel.name.split('-')[1];

            fs.appendFileSync(path.resolve(`./db/tickets/${interaction.guild.id}/${ticketID}.txt`), `\n--Ticket closed by ${interaction.user.tag} / ${interaction.user.id}--\n`);

            const ticketMessage = await interaction.channel.messages.fetch(fs.readFileSync(path.resolve(`./db/tickets/${interaction.guild.id}/${ticketID}.ticket`), 'utf8').split('\n')[1]);

            const row = new Discord.MessageActionRow()

            const openTicketButton = new Discord.MessageButton()
                .setCustomId('open_ticket')
                .setLabel('Open')
                .setStyle('SUCCESS')
                .setEmoji('🔓')

            row.addComponents(openTicketButton);

            ticketMessage.edit({ components: [row] })

            if (ticketChannel.type != 'GUILD_TEXT') return interaction.reply({ content: 'Something went wrong and we were unable to find the ticket channel.', ephemeral: true });

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

            let ticketNumber = ticketFiles.length / 2;

            const ticketID = ticketChannel.name.split('-')[1];

            fs.appendFileSync(path.resolve(`./db/tickets/${interaction.guild.id}/${ticketID}.txt`), `\n--Ticket opened by ${interaction.user.tag} / ${interaction.user.id}--\n`);

            const ticketMessage = await interaction.channel.messages.fetch(fs.readFileSync(path.resolve(`./db/tickets/${interaction.guild.id}/${ticketID}.ticket`), 'utf8').split('\n')[1]);

            const row = new Discord.MessageActionRow()

            const closeTicketButton = new Discord.MessageButton()
                .setCustomId('close_ticket')
                .setLabel('Close')
                .setStyle('DANGER')
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
      } catch {
        interaction.reply({ content: 'Something went wrong and we were unable to process your request.', ephemeral: true });
      }
    }
} catch {
    console.log('Tickets > Error encountered while dealing with a request.');
    return interaction.reply({ content: 'An error occurred.', ephemeral: true });
}
})