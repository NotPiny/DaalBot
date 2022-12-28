const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ButtonInteraction, MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
module.exports = {
    category: 'Other',
    description: 'Brings up link to vote for the bot',
  
    slash: true,
    testOnly: false,
    guildOnly: true,

    // options: [
    //     {
    //         name: 'site',
    //         description: 'The site to vote on',
    //         type: 'STRING',
    //         choices: [
    //             'top.gg'
    //         ]
    //     }
    // ],
  
    callback: async ({ message, args, interaction, interaction: msgInt, channel }) => {
        // return `This command has been temp disabled`
        // const site = await interaction.options.getString('site')

        const Embed = new MessageEmbed()
            .setColor(0x0099FF)
            .setTitle('You can vote here')
            .setDescription('')

        const linkRow = new MessageActionRow().addComponents(
            new MessageButton()
              .setURL('https://top.gg/bot/965270659515183206/vote')
              .setLabel('top.gg')
              .setEmoji('1022434657083596831')
              .setStyle('LINK')
          )

        // if (interaction.options.getString('site') === null) {
        msgInt.reply({ 
            embeds: [Embed], 
            components: [linkRow]
        })
        .then(() => { console.log(':)') })
        .catch(() => { console.log('bruh') })
        
    //   } else {
    //     if (site === 'top.gg') {
    //         const tEmbed = new MessageEmbed()
    //         .setColor(0x0099FF)
    //         .setTitle('Here!')
    //         .setDescription('https://top.gg/bot/965270659515183206/vote')
    //         msgInt.reply({tEmbed})
    //     }
    //   }
    },
  }