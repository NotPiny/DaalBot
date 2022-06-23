module.exports = {
    category: 'Testing',
    description: 'Simulates a join.',
  
    slash: true,
    testOnly: true,
  
    callback: ({ member, client }) => {
      client.emit('guildMemberAdd', member)
      return 'Join simulated!'
    },
  }