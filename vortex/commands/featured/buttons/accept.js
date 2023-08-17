const client = require('../../../../client.js');
const daalbot = require('../../../../daalbot.js');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

client.on('interactionCreate', async (interaction) => {
    if (interaction.isButton()) {
        if (interaction.customId === 'vortex-featured-accept') {
            const member = daalbot.getMember(interaction.guild.id, interaction.message.embeds[0].footer.text)
            const role = interaction.guild.roles.cache.get('974380330473631776');

            member?.roles?.add(role)
            .then(() => {
                interaction.reply({ content: 'Successfully added role!', ephemeral: true });
            })
            .catch(() => {
                interaction.reply({ content: 'Failed to add role!', ephemeral: true })
            })

            const successEmbed = new EmbedBuilder()
            .setTitle('Featured Creator Application Accepted')
            
            successEmbed.setDescription(`**Sac Code:** ${interaction.message.embeds[0].description.split('\n')[0].split(' ')[2]}\n**Map Code:** ${interaction.message.embeds[0].description.split('\n')[1].split(' ')[2]}`)

            successEmbed.setAuthor({
                name: 'Vortex',
                iconURL: interaction.guild.iconURL({ dynamic: true }) == null ? 'https://pinymedia.web.app/Daalbot.png' : interaction.guild.iconURL({ dynamic: true })
            })

            successEmbed.setColor('#57F28D')

            successEmbed.setTimestamp()

            member?.send({ embeds: [successEmbed] })
            .then(() => {
                console.log(`Sent message to ${member?.user.tag}`)
            })
            .catch(() => {
                console.log(`Failed to send message to ${member?.user.tag}`)
            })

            const row = new ActionRowBuilder()

            const acceptButton = new ButtonBuilder()
                .setCustomId('vortex-featured-accept')
                .setLabel('Accept')
                .setStyle(ButtonStyle.Success)
                .setDisabled(true)

            const denyButton = new ButtonBuilder()
                .setCustomId('vortex-featured-deny')
                .setLabel('Deny')
                .setStyle(ButtonStyle.Danger)
                .setDisabled(true)

            row.addComponents(acceptButton, denyButton)

            const message = await interaction.channel.messages.fetch(interaction.message.id)

            message.edit({
                components: [row]
            });
        }
    }
})