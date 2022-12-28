const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ButtonInteraction, MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
module.exports = {
    category: 'Testing',
    description: 'Testing button things',
  
    slash: true,
    testOnly: true,
    guildOnly: true,
  
    callback: async ({ message, args, interaction: msgInt, channel }) => {
        // return `This command has been temp disabled`

        const Embed = new MessageEmbed()
            .setColor(0x0099FF)
            .setTitle('You can vote here')
            .setDescription('Links:\n[top.gg](top.gg/bot/965270659515183206/vote)')

        const linkRow = new MessageActionRow().addComponents(
            new MessageButton()
              .setURL('https://top.gg/bot/965270659515183206/vote')
              .setLabel('top.gg')
              .setEmoji('1003740132391800952')
              .setStyle('LINK')
          )

        msgInt.reply({ 
            embeds: [Embed], 
            components: [linkRow]
        })
    },
  }