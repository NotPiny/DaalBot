const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ButtonInteraction, EmbedBuilder } = require('discord.js');
module.exports = {
    category: 'Testing',
    description: 'Testing button things',
  
    slash: true,
    testOnly: true,
    guildOnly: true,
  
    callback: async ({ message, args, interaction: msgInt, channel }) => {
        // return `This command has been temp disabled`

        const Embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(':)')

        const linkRow = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setURL('https://daalbot.xyz')
              .setLabel('Test')
              .setStyle(ButtonStyle.Link)
          )

        msgInt.reply({ 
            embeds: [Embed], 
            components: [linkRow]
        })
    },
  }