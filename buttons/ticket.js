const client = require('../client.js');
const config = require('../config.json');
const daalbot = require('../daalbot.js');
const Discord = require('discord.js');
const fs = require('fs');

client.on('interactionCreate', async (interaction) => {
    if (interaction.isButton()) {
        if (interaction.customId == 'create_ticket') {
            const ticketCategory = daalbot.getChannel(interaction.guild.id, fs.readFileSync(`${config.botPath}/db/tickets/${interaction.guild.id}.category`, 'utf8'));
            if (!ticketCategory) return interaction.reply({ content: 'The ticket category is not set up.', ephemeral: true });

            // Check the ticket amount
            if (!fs.existsSync(`${config.botPath}/db/tickets/${interaction.guild.id}/`)) {
                fs.mkdirSync(`${config.botPath}/db/tickets/${interaction.guild.id}/`);
            }
            let ticketAmount = fs.readdirSync(`${config.botPath}/db/tickets/${interaction.guild.id}/`).length;
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

            const attentionMessage = await ticketChannel.send(`<@${interaction.user.id}>`);

            attentionMessage.delete();

            interaction.reply({ content: 'Your ticket has been created.', ephemeral: true });
        }
    }
})