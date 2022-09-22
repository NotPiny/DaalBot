const client = require('../client'); require('dotenv').config(); const { WOKCommands } = require('../config.json');

client.on('messageCreate', msg => {
    if (!WOKCommands.BotOwners.includes(msg.author.id)) {
        return;
    } else {
        if (msg.content.toLowerCase().startsWith('$stats')) {
            msg.reply(`Status: Online\nServers: ${client.guilds.cache.size}\nDelay: Please Wait...\nLast restart: ${client.readyAt} / ${client.readyTimestamp}\nShards: ${client.options.shardCount}`)
            .then(message => {
                message.edit(`Status: Online\nServers: ${client.guilds.cache.size}\nDelay: ${Date.now() - msg.createdTimestamp}ms\nLast restart: ${client.readyAt} / ${client.readyTimestamp}\nShards: ${client.options.shardCount}`)
            })
        }
    }
})

// client.login(process.env.TOKEN)