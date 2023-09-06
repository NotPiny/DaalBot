const client = require('../../../../client.js');
const daalbot = require('../../../../daalbot.js');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder, ButtonStyle } = require('discord.js');

client.on('interactionCreate', async (interaction) => {
    if (interaction.isButton()) {
        if (interaction.customId === 'vortex-featured-deny') {
           const denyDropdown = new StringSelectMenuBuilder()
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
               components: [new ActionRowBuilder().addComponents(denyDropdown)],
               embeds: [
                   new EmbedBuilder()
                   .setTitle(interaction.message.embeds[0].footer.text)
                   .setDescription('Ignore this message it is for keeping track of the user')
               ],
               ephemeral: true
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
            })
       }
   }
})