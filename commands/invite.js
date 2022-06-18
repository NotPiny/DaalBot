module.exports = {
    category: 'Testing',
    description: 'Replies with a link to invite the bot!',
  
    slash: true,
    testOnly: true,
  
    callback: () => {
      return 'You can invite me to your server with this link: https://daalbot-a.web.app/Invite'
    },
  }