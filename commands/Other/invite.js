module.exports = {
    category: 'Other',
    description: 'Replies with a link to invite the bot!',
  
    slash: 'both',
    testOnly: false,
  
    callback: () => {
      return 'You can invite me to your server with this link: https://daalbot-a.web.app/Invite'
      
      
    },
  }