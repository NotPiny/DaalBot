module.exports = {
    category: 'Moderation',
    description: 'Kicks a user',
  
    permissions: ['ADMINISTRATOR'],
  
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
        return 'Please tag someone to kick.'
        
        
      }
  
      if (!target.kickable) {
        return 'Cannot kick that user.'
        
        
      }
  
      args.shift()
      const reason = args.join(' ')
  
      target.kick(reason)
  
      return `You kicked <@${target.id}>`
      
      
    },
  }