TextChannel = require('discord.js')

module.exports = {
  category: 'Pen',
  description: 'pensend',

  minArgs: 2,
  expectedArgs: '<channel> <text>',
  expectedArgsTypes: ['CHANNEL', 'STRING'],

  slash: true,
  testOnly: false,
  guildOnly: true,
  ownerOnly: true,

  callback: ({ message, interaction, args }) => {
    const channel = (
      message
        ? message.mentions.channels.first()
        : interaction.options.getChannel('channel')
    )
    if (!channel || channel.type !== 'GUILD_TEXT') {
      return 'Please tag a text channel.'
    }

    args.shift() // Remove the channel from the arguments array
    const text = args.join(' ');
    const result = text.replace(/<nl>/g, "\n");

    channel.send(result)

    if (interaction) {
      interaction.reply({
        content: 'Sent message!',
        ephemeral: true,
      })
    } else {
      return 'Sent message!'
    }
  },
}