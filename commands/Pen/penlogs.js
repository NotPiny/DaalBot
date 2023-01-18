const fs = require('fs')  
const path = require('path')
  module.exports = {
    category: 'Pen',
    description: 'penlogs',
  
    slash: true,
    testOnly: true,
    guildOnly: true,
    ownerOnly: true,
  
    callback: (interaction) => {
        if (!['900126154881646634'].includes(interaction.user.id)) {
            return 'You are not allowed to use this command'
        } else {
          const data = fs.readFileSync(path.resolve('./pm2.log'), 'utf-8')
          fs.appendFileSync(path.resolve('./temp/pm2.log'), data)
          interaction.user.send({ files: [path.resolve('./temp/pm2.log')] })
          return 'Sent logs'
      }
  }
}