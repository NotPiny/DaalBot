module.exports = {
    category: 'Testing',
    description: 'Simulates a join.',
  
    slash: 'both',
    testOnly: true,
  
    callback: ({ member, client }) => {
      client.emit('guildMemberAdd', member)
      return 'Join simulated!'
      
      
    },
  }