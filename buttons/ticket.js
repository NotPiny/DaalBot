const client = require('../client.js');
const config = require('../config.json');
const daalbot = require('../daalbot.js');
const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');

client.on('interactionCreate', async (interaction) => {
    try {
    if (interaction.isButton()) {
        if (interaction.customId == 'create_ticket') {
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
                .setTitle('Ticket')
                .setDescription(`Hello ${interaction.user.username}, welcome to your ticket\nSomeone will be with you shortly`)
                .setColor('PURPLE')
                .setTimestamp();

            ticketChannel.send({ embeds: [ticketEmbed] });
            }

            interaction.reply({ content: 'Your ticket has been created.', ephemeral: true });
        }
    }
} catch {
    console.log('Tickets > Error encountered while creating a ticket.');
    return interaction.reply({ content: 'An error occurred while creating your ticket.', ephemeral: true });
}
})