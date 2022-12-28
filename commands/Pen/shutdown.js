module.exports = {
    category: 'Pen',
    description: 'Takes the bot offline',
  
    slash: 'both',
    testOnly: true,
  
    ownerOnly: true,
  
    callback: ({ message, client, text }) => {
      client.user?.setPresence({
        status: 'online',
        activities: [
          {
            name: 'I have been shutdown',
          },
        ],
      })
      process.exit() 
    },
  }
  