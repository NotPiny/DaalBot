const daalbot = require('../daalbot.js');
const DJS = require('discord.js');
const path = require('path');
const fs = require('fs');
const client = daalbot.client;

client.on('interactionCreate', interaction => {
    if (!interaction.isSelectMenu()) return;

    if (interaction.customId == 'eventDropdown_create') {
        const event = interaction.values[0];

        if (event == 'MSG_CREATE') {
            const guildEventPath = path.resolve(`./db/events/${interaction.guild.id}/`)

            if (fs.existsSync(guildEventPath)) {
                const eventAmount = fs.readdirSync(guildEventPath).length;

                const data = {
                    name: 'messageCreate',
                    id: eventAmount + 1,
                    type: 'MSG_CREATE',
                    response: 'Pending...'
                }

                fs.appendFileSync(`${guildEventPath}/${eventAmount + 1}.event`, JSON.stringify(data, null, 4));

                const responseDropdown = new DJS.MessageActionRow()
                .addComponents(
                    new DJS.MessageSelectMenu()
                        .setCustomId('eventDropdown_create_response')
                        .setPlaceholder('Select a response')
                        .addOptions([
                            {
                                label: 'Send message',
                                description: 'Sends a message.',
                                value: 'SEND_MSG'
                            }
                        ])
                        .setMinValues(1)
                        .setMaxValues(1)
                )

                interaction.reply({
                    content: 'Select a response.',
                    components: [responseDropdown],
                    ephemeral: true
                })
            } else {
                fs.mkdirSync(guildEventPath);
                const eventAmount = 0;

                const data = {
                    name: 'messageCreate',
                    id: eventAmount + 1,
                    type: 'MSG_CREATE',
                    response: 'Pending...'
                }

                fs.appendFileSync(`${guildEventPath}/${eventAmount + 1}.event`, JSON.stringify(data, null, 4));

                const responseDropdown = new DJS.MessageActionRow()
                .addComponents(
                    new DJS.MessageSelectMenu()
                        .setCustomId('eventDropdown_create_response')
                        .setPlaceholder('Select a response')
                        .addOptions([
                            {
                                label: 'Send message',
                                description: 'Sends a message.',
                                value: 'SEND_MSG'
                            }
                        ])
                        .setMinValues(1)
                        .setMaxValues(1)
                )

                interaction.reply({
                    content: 'Select a response.',
                    components: [responseDropdown],
                    ephemeral: true
                })
            }
        }
    }
});