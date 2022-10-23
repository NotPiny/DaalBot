const client = require('../client.js');
const config = require('../config.json');
const daalbot = require('../daalbot.js');
const Discord = require('discord.js');
const fs = require('fs');

client.on('interactionCreate', async (interaction) => {
    if (interaction.isButton()) {
        if (interaction.customId == 'create_ticket') {
            const ticketCategory = daalbot.getChannel(interaction.guild.id, fs.readFileSync(`${config.botPath}/db/tickets/${interaction.guild.id}.category`, 'utf8'));

            // Check if the user already has a ticket.
            if (fs.existsSync(`${config.botPath}/db/tickets/${interaction.guild.id}/${interaction.user.id}.ticket`)) return interaction.reply({
                content: 'You already have a ticket open.',
                ephemeral: true
            });

            const ticketChannel = await interaction.guild.channels.create(`ticket-${interaction.user.id}`, {
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

            if (fs.existsSync(`${config.botPath}/db/tickets/${interaction.guild.id}`)) {
                fs.appendFileSync(`${config.botPath}/db/tickets/${interaction.guild.id}/${interaction.user.id}.txt`, `${interaction.user.id}`);
            } else {
                fs.mkdirSync(`${config.botPath}/db/tickets/${interaction.guild.id}`);
                fs.appendFileSync(`${config.botPath}/db/tickets/${interaction.guild.id}/${interaction.user.id}.txt`, `${interaction.user.id}`);
            }

            const attentionMessage = await ticketChannel.send(`<@${interaction.user.id}>`);

            attentionMessage.delete();

            interaction.reply({ content: 'Your ticket has been created.', ephemeral: true });
        }
    }
})