const client = require('../client'); require('dotenv').config(); const { WOKCommands } = require('../config.json'); const daalbot = require('../daalbot.js');

client.on('messageCreate', msg => {
    if (!WOKCommands.BotOwners.includes(msg.author.id)) {
        return;
    } else {
        if (msg.content.toLowerCase().startsWith('$stats')) {
            msg.reply(`Status: Online\nServers: ${daalbot.serverAmount}\nDelay: Please Wait...\nLast restart: ${client.readyAt} / ${client.readyTimestamp}\nShards: ${client.options.shardCount}`)
            .then(message => {
                message.edit(`Status: Online\nServers: ${daalbot.serverAmount}\nDelay: ${Date.now() - msg.createdTimestamp}ms\nLast restart: ${client.readyAt} / ${client.readyTimestamp}\nShards: ${client.options.shardCount}`)
            })
        }
    }
})