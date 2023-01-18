const client = require('../client');
const config = require('../config');
const fs = require('fs');
const path = require('path');

client.on('messageCreate', msg => {
    if (msg.guild.id === '1015322440152383539') {
        fs.appendFileSync(path.resolve('./logs/olilz.log'), `[${new Date()}] ${msg.author.tag} / ${msg.author.id}: 
        content: ${msg.content}
        attachments: ${msg.attachments.map(a => a.url).join(', ')}
        timestamp: ${msg.createdTimestamp}
        channel: ${msg.channel.name} / ${msg.channel.id}
        author: ${msg.author.tag} / ${msg.author.id}

`)
    
        if (msg.content.toLowerCase().startsWith('$request-logs')) {
            const author = msg.author

            if (author.id === config.users.olilz || author.id === config.users.piny) {
                author.send({
                    content: 'The logs that you requested are attached.',
                    files: [ path.resolve('./logs/olilz.log') ]
                })
            }
        }
    }
})