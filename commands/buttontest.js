const { ButtonInteraction, MessageActionRow, MessageButton } = require('discord.js')
module.exports = {
    category: 'Testing',
    description: 'Testing',
  
    slash: true,
    testOnly: true,
    guildOnly: true,

    minArgs: 2,
    expectedArgs: '<user> <reason>',
    expectedArgsTypes: ['USER', 'STRING'],
  
    callback: async ({ message, args, interaction: msgInt, channel }) => {
        return `This command has been temp disabled`
    //   const target = message
    //   ? message.mentions.members?.first()
    //   : (interaction.options.getMember('user'))
    // if (!target) {
    //   return 'Please tag someone to ban.'
    // }

    // if (!target.bannable) {
    //   return 'Cannot ban that user.'
    // }

    // args.shift()
    // const reason = args.join(' ')

    //   const row = new MessageActionRow()
    //     .addComponents(
    //       new MessageButton()
    //         .setCustomId('yes')
    //         .setEmoji('✅')
    //         .setLabel('Confirm')
    //         .setStyle('SUCCESS')
    //     )
    //     .addComponents(
    //       new MessageButton()
    //         .setCustomId('no')
    //         .setEmoji('❌')
    //         .setLabel('Cancel')
    //         .setStyle('DANGER')
    //     )
  
    //   const linkRow = new MessageActionRow().addComponents(
    //     new MessageButton()
    //       .setURL('https://daalb0t.web.app')
    //       .setLabel('Visit DaalBot')
    //       .setStyle('LINK')
    //   )
  
    //   await msgInt.reply({
    //     content: 'All possible button styles:',
    //     components: [row, linkRow],
    //     ephemeral: true,
    //   })
  
    //   const collector = channel.createMessageComponentCollector({
    //     max: 1,
    //     time: 1000 * 15,
    //   })
  
    //   collector.on('collect', () => {
    //     // BLANK
    //   })
  
    //   collector.on('end', async (collection) => {
    //     collection.forEach((click) => {
    //       console.log(click.user.id, click.customId)
    //     })
  
    //     if (collection.first()?.customId === 'yes') {
    //         target.ban({
    //             reason,
    //             days: 7,
    //           })
    //       await msgInt.editReply({
    //         content: `Banned <@${target.id}>`,
    //         components: [],
    //       })
    //       .catch(() => {console.log(`Error: could not send reply`)});
    //       return
    //     }
  
    //     await msgInt.editReply({
    //       content: 'An action has already been taken.',
    //       components: [],
    //     })
    //   })
    },
  }