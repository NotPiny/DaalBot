const client = require('../../../client');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const DJS = require('discord.js');
require('./buttons/accept');
require('./buttons/deny');
require('./dropdown/deny');

client.on('ready', () => {
    const VTXserver = client.guilds.cache.get('973711816226136095');
    const commands = VTXserver?.commands;

    commands?.create({
        name: 'featured',
        description: 'Apply for the featured creator role',
        options: [
            {
                name: 'username',
                description: 'Your epic games username',
                type: 3, 
                required: true
            },
            {
                name: 'map-code',
                description: 'The code of the map that got featured',
                type: 3,
                required: true
            }
        ]
    })
    .catch(console.log);
})

client.on('interactionCreate', async (interaction) => {
    if (interaction.isCommand()) {
        if (interaction.commandName === 'featured') {
            const VTXserver = client.guilds.cache.get('973711816226136095');
            const sacCode = interaction.options.getString('username');
            const mapCode = interaction.options.getString('map-code');

            const mapCodeSegments = mapCode.split('-');

            if (!mapCode.includes('-')) return interaction.reply({ content: 'Invalid map code! Please use -\'s', ephemeral: true });

            mapCodeSegments.forEach(segment => { if (isNaN(segment) || segment.length !== 4) return interaction.reply({ content: 'Invalid map code!', ephemeral: true }) })

            const channel = VTXserver.channels.cache.get('1092197227646169169') // Skra mess up and forcing this to be changed count: 1

            const embed = new MessageEmbed()
            .setTitle('Featured Creator Application')
            .setDescription(`**Username:** ${sacCode}\n**Map Code:** ${mapCode}`)
            .setFooter({
                text: interaction.user.id,
            })
            .setTimestamp()
            .setColor('BLUE');

            const acceptButton = new MessageButton()
            .setCustomId('vortex-featured-accept')
            .setLabel('Accept')
            .setStyle('SUCCESS');

            const denyButton = new MessageButton()
            .setCustomId('vortex-featured-deny')
            .setLabel('Deny')
            .setStyle('DANGER');

            const row = new MessageActionRow()

            row.addComponents(acceptButton);
            row.addComponents(denyButton);

            try {
                await channel.send({ 
                    content: `New featured creator application from <@${interaction.user.id}>`, 
                    embeds: [embed], 
                    components: [row]
                })

                interaction.reply({ content: 'Thanks for submitting for the featured role \n (Make sure your DMs are open for when your application is reviewed)', ephemeral: true })
            } catch (e) {
                console.log(`Error: ${e}`);
                
                try {
                    await interaction.reply({ content: 'There was an error while trying to submit your application', ephemeral: true })
                } catch {
                    console.log('Error: Failed to send error message');
                }
            }
        }
    }
})
