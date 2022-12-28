const client = require('../client'); require('dotenv').config(); const config = require('../config.json'); const prefix = config.prefix

client.on('messageCreate', msg => {
    if (msg.content.toLowerCase().startsWith(`${prefix}delay`)) {
        msg.reply('Pinging <a:typing:976598236561289256>')
        .then((message) => {
        message.edit({
          content: `${Date.now() - msg.createdTimestamp}ms`, 
        })
        });
      }
})