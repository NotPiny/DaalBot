module.exports = {
    category: 'Testing',
    description: 'Replies with a link to the bots site!',
  
    slash: true,
    testOnly: false,
  
    callback: () => {
      return 'You can check out my website here: https://daalbot-a.web.app'
    },
  }