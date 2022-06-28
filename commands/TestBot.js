module.exports = {
    category: 'Testing',
    description: 'Tests if the bot is responding',
  
    slash: 'both',
    testOnly: false,
  
    callback: () => {
      return 'The bot is responding'    
  }
}