const fs = require('fs')  
  module.exports = {
    category: 'Configuration',
    description: 'Brings up server logs',
  
    slash: true,
    testOnly: true,
    guildOnly: true,
    ownerOnly: true,
  
    callback: async () => {
        fs.readFile('./chat/all.chatlog', 'utf8', function (err, data) {
            if (err) { console.log(err) } else {
                const response = data.slice(data.length - 3500);
                console.log(`Response set to "${data}"`)
            return {
                custom: true,
                content: `${response}\nOnly the last 3500 letters have been sent`,
                ephemeral: true,
              }
            }
           });
        return {
            custom: true,
            content: 'If you see this something went wrong',
            ephemeral: true,
        }
    }
}