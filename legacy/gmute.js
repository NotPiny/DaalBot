const client = require('../client.js');
const fs = require('fs');

client.on('messageCreate', async (msg) => {
    const guild = msg.guild;
    const member = msg.member;
    const channel = msg.channel;
    if (!fs.existsSync(`../gmuted.list`)) return;
    const list = fs.readFileSync('../gmuted.list').toString().split('\n');

    if (list.includes(member.id)) {
        msg.delete();
    }
})