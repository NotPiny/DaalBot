const client = require('../../../client.js');
const daalbot = require('../../../daalbot.js');
const config = require('../../../config.json');
const DJS = require('discord.js');

client.on('interactionCreate', async (interaction) => {
    // Check if the interaction is a button
    if (interaction.isButton()) {
        // Check if the button is a part of the team health buttons
        if (interaction.customId.startsWith('vortex-teamhealth-')) {
            const button = interaction.customId.split('-')[2];

            const skra = daalbot.getUser(config.users.skra)

            if (!skra.id) {
                return interaction.reply({
                    content: 'Error: The bot was unable to get skra\'s user object',
                    ephemeral: true
                })
            }

            const embed = new DJS.MessageEmbed()
                .setTitle('Team Health')
                .setDescription(`**<@${interaction.user.id}>** has clicked on the **${button}** button`)
                .setFooter({
                    text: interaction.user.id,
                    iconURL: interaction.user.avatarURL()
                })

            skra.send({
                content: 'A team health button has been clicked',
                embeds: [embed]
            })

            interaction.reply({
                content: 'Your response has been recorded',
                ephemeral: true
            })
        }
    }
})