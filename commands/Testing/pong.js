module.exports = {
    category: 'Testing',
    description: 'The reverse of /ping',
  
    slash: 'both',
    testOnly: true,
  
    callback: () => {
      return 'Ping'
      
      
    },
  }