module.exports = {
    category: 'Pen',
    description: 'pencc',
  
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: '[amount]',
  
    slash: true,
    testOnly: false,
    ownerOnly: true,
  
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
      .then(() => { console.log('Successfully deleted the message(s)'); })
      
  
      return `Deleted ${size} message(s).`
      
      
    },
  }