module.exports = {
    category: 'Moderation',
    description: 'Deletes multiple messages at once.',
  
    // permissions: ['ADMINISTRATOR'],
    requireRoles: true,
  
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '[amount]',
  
    slash: true,
    testOnly: false,
  
    callback: async ({ message, interaction, channel, args }) => {
      const amount = parseInt(args.shift())
  
      if (message) {
        await message.delete()
      }
  
      // Bulk delete
      if (amount > 100 || amount < 1) {
        return 'Please pick a number from 1 to 100'
        
        
      }

      const { size } = await channel.bulkDelete(amount, true)
  
      return `Deleted ${size} message(s).`
      
      
    },
  }