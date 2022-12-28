const client = require('../client.js');

client.on('messageCreate', msg => {
    if (msg.content.toLowerCase().includes('poll')) {
        msg.react('1022428653444943882')
        setTimeout(() => {
            msg.react('1022428651549118494')
            setTimeout(() => {
                msg.react('1022428655005220864')
            }, 1000);
        }, 1000)
    }
})