const client = require('../client.js');

client.on('messageCreate', msg => {
    if (msg.content.toLowerCase().includes('poll')) {
        msg.react('✅')
        msg.react('❌')
        msg.react('➖')
    }
})