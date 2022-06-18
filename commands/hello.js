module.exports = {
    category: 'Testing',
    description: 'Replies with Hello There!',
  
    slash: true,
    testOnly: false,
  
    callback: () => {
      return 'Hello There'
    },
  }