module.exports = {
    category: 'Testing',
    description: 'Checks if the bot crashes when a command is ran',
  
    slash: true,
    testOnly: false,
  
    callback: () => {
      return 'The bot did not crash'
    },
  }