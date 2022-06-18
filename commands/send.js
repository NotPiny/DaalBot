TextChannel = require('discord.js')

module.exports = {
  category: 'Configuration',
  description: 'Sends a message.',

  permissions: ['ADMINISTRATOR'],

  minArgs: 2,
  expectedArgs: '<channel> <text>',
  expectedArgsTypes: ['CHANNEL', 'STRING'],

  slash: true,
  testOnly: false,
  guildOnly: true,

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
    const sendText = `${text}`

    channel.send(sendText)

    if (interaction) {
      interaction.reply({
        content: 'Sent message!',
        ephemeral: true,
      })
    }
  },
}