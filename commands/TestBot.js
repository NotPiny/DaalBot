module.exports = {
    category: 'Testing',
    description: 'Tests if the bot is responding',
  
    slash: true,
    testOnly: false,
  
    callback: () => {
      return {
        custom: true,
        content: 'The bot is responding',
        ephemeral: true,
    }
    },
  }