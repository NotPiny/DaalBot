const client = require('../client'); require('dotenv').config(); const today = new Date(); const currentYear = today.getFullYear();

client.on('messageCreate', msg => {
    if (msg.content.toLowerCase().endsWith("don't quote me on this")) {
        msg.channel.send(`${msg.content} \n-${msg.author.username} ${currentYear}`)
        console.log(msg.author.username + 'activated "Don\'t quote me"')
    }
})