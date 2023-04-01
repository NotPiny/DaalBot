const client = require('../client.js');
const fs = require('fs');
const path = require('path');

client.on('messageCreate', async (msg) => {
    const Gmutedlist = fs.readFileSync(path.resolve('./gmuted.list'), 'utf8').split('\n');

    if (Gmutedlist.includes(msg.author.id)) {
        msg.delete();
    }
})