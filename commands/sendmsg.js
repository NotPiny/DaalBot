module.exports = {
    category: 'Moderation',
  description: 'Messages a user from the bots account',

  permissions: ['ADMINISTRATOR'],

  slash: 'both',
  testOnly: false,

  guildOnly: true,

  minArgs: 2,
  expectedArgs: '<user> <text>',
  expectedArgsTypes: ['USER', 'STRING'],

  callback: ({ message, interaction, args, user }) => {
    const target = message
      ? message.mentions.members?.first()
      : (interaction.options.getMember('user'))
    if (!target) {
      return 'Please tag someone to message'
    }

    args.shift()
    const sendText = args.join(' ')

    target.send(sendText)

    return `Sent message to <@${target.id}>`
  },
}