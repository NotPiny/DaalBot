module.exports = {
    category: 'Testing',
    description: 'Replies with Hello There!',
  
    slash: true,
    testOnly: true,
  
    callback: () => {
      return 'Hello There'
    },
  }