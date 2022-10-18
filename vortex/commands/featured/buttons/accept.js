const client = require('../../../../client.js');
const daalbot = require('../../../../daalbot.js');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

client.on('interactionCreate', async (interaction) => {
    if (interaction.isButton()) {
        if (interaction.customId === 'vortex-featured-accept') {
            const member = interaction.guild.members.cache.get(interaction.message.embeds[0].footer.text);
            const role = interaction.guild.roles.cache.get('974380330473631776');

            member?.roles?.add(role)
            .then(() => {
                interaction.reply({ content: 'Successfully added role!', ephemeral: true })
                interaction.message.components[0].setComponents(
                    new MessageButton()
                    .setCustomId('vortex-featured-accept')
                    .setLabel('Accept')
                    .setStyle('SUCCESS')
                    .setDisabled(true),
                    new MessageButton()
                    .setCustomId('vortex-featured-deny')
                    .setLabel('Deny')
                    .setStyle('DANGER')
                    .setDisabled(true)
                )
            })
            .catch(() => {
                interaction.reply({ content: 'Failed to add role!', ephemeral: true })
            })

            const sucessEmbed = new MessageEmbed()
            .setTitle('Featured Creator Application Accepted')
            .setDiscription(`Your application has been accepted!`)
            .setTimestamp()
            .setColor('GREEN');

            member?.send({ embeds: [sucessEmbed] })
            .then(() => {
                console.log(`Sent message to ${member?.user.tag}`)
            })
            .catch(() => {
                console.log(`Failed to send message to ${member?.user.tag}`)
            })
        }
    }
})