TextChannel = require('discord.js')

module.exports = {
  category: 'Configuration',
  description: 'Sends a message.',

  minArgs: 2,
  expectedArgs: '<channel> <text>',
  expectedArgsTypes: ['CHANNEL', 'STRING'],

  slash: 'both',
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
    const text = args.join(' ')

    channel.send(text)

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