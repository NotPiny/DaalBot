const client = require('../../../../client.js');
const daalbot = require('../../../../daalbot.js');
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');

client.on('interactionCreate', async (interaction) => {
    if (interaction.isButton()) {
        if (interaction.customId === 'vortex-featured-deny') {
           const denyDropdown = new MessageSelectMenu()
           .setCustomId('vortex-featured-deny-dropdown')
           .setPlaceholder('Select a reason')
           .addOptions([
               {
                   label: 'Invalid Map Code',
                   value: 'invalid-map-code'
               },
               {
                   label: 'Invalid username',
                   value: 'invalid-sac-code'
               },
               {
                   label: 'Not a featured creator',
                   value: 'not-a-featured-creator'
               },
               {
                   label: 'Other',
                   value: 'other'
               }
           ])
           .setMinValues(1)
           .setMaxValues(1)
           
           interaction.reply({
               content: 'Please select a reason for denying the application',
               components: [new MessageActionRow().addComponents(denyDropdown)],
               embeds: [
                   new MessageEmbed()
                   .setTitle(interaction.message.embeds[0].footer.text)
                   .setDescription('Ignore this message it is for keeping track of the user')
               ],
               ephemeral: true
           })

           const row = new MessageActionRow()

            const acceptButton = new MessageButton()
                .setCustomId('vortex-featured-accept')
                .setLabel('Accept')
                .setStyle('SUCCESS')
                .setDisabled(true)

            const denyButton = new MessageButton()
                .setCustomId('vortex-featured-deny')
                .setLabel('Deny')
                .setStyle('DANGER')
                .setDisabled(true)

            row.addComponents(acceptButton, denyButton)

            const message = await interaction.channel.messages.fetch(interaction.message.id)

            message.edit({
                components: [row]
            })
       }
   }
})