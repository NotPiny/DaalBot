module.exports = {
    category: 'Pen',
  description: 'pensendmsg',

  slash: true,
  testOnly: false,
  ownerOnly: true,

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

    console.log(`\n---A user (${user.id}) has sent a message to "${target.id}" with the text "${sendText}"---\n`)
    return {
      custom: true,
      content: `Sent message to <@${target.id}>`,
      ephemeral: true,
    }
    
    
  },
}