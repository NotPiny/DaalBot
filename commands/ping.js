    module.exports = {
    category: 'Testing',
    description: 'Replies with pong',
  
    slash: true,
    testOnly: false,
  
    callback: () => {
      return 'Pong'
    },
  }