module.exports = {
    category: 'Moderation',
  description: 'Bans a user',

  // permissions: ['ADMINISTRATOR'],
  requireRoles: true,

  slash: 'both',
  testOnly: false,

  guildOnly: true,

  minArgs: 2,
  expectedArgs: '<user> <reason>',
  expectedArgsTypes: ['USER', 'STRING'],

  callback: ({ message, interaction, args }) => {
    const target = message
      ? message.mentions.members?.first()
      : (interaction.options.getMember('user'))
    if (!target) {
      return 'Please tag someone to ban.'
    }

    if (!target.bannable) {
      return 'Cannot ban that user.'
      
      
    }

    args.shift()
    const reason = args.join(' ')

    target.ban({
      reason,
      days: 7,
    })

    return `You banned <@${target.id}>`
    
    
  },
} 