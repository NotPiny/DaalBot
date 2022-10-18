const client = require('../../../client');
const daalbot = require('../../../daalbot');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
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
                name: 'sac-code',
                description: 'Your sac code',
                type: 'STRING', 
                required: true
            },
            {
                name: 'map-code',
                description: 'The code of the map that got featured',
                type: 'STRING',
                required: true
            }
        ]
    })
    .then(() => {
        console.log('Vortex > Commands > Updated "Featured" Command');
    })
    .catch(console.log);
})

client.on('interactionCreate', async (interaction) => {
    if (interaction.isCommand()) {
        if (interaction.commandName === 'featured') {
            const sacCode = interaction.options.getString('sac-code');
            const mapCode = interaction.options.getString('map-code');

            const channel = client.channels.cache.get('1031596467934203915');

            const embed = new MessageEmbed()
            .setTitle('Featured Creator Application')
            .setDescription(`**Sac Code:** ${sacCode}\n**Map Code:** ${mapCode}`)
            .setFooter(interaction.user.id)
            .setTimestamp()
            .setColor('BLUE');

            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('vortex-featured-accept')
                .setLabel('Accept')
                .setStyle('SUCCESS'),
                new MessageButton()
                .setCustomId('vortex-featured-deny')
                .setLabel('Deny')
                .setStyle('DANGER')
            )

            channel.send({ 
                content: `New featured creator application from <@${interaction.user.id}>`, 
                embeds: [embed], 
                components: [row] 
            })
            interaction.reply({ content: 'Your application has been sent!', ephemeral: true })
        }
    }
})