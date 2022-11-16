const client = require('../client.js');
const daalbot = require('../daalbot.js');
const fs = require('fs');
const path = require('path');

client.on('messageCreate', async (msg) => {
    const channel = msg.channel;
    const content = msg.content;
    const author = msg.author;
    const guild = msg.guild;
    let channelName = '';
    if (channel.name) {
        channelName = channel.name;
    }

    if (channelName.startsWith('ticket-')) {
        const ticketId = channelName.replace('ticket-', '');

        if (!fs.existsSync(path.resolve(`./db/tickets/${guild.id}/${ticketId}.ticket`))) return;

        const ticketTranscriptPath = path.resolve(`./db/tickets/${guild.id}/${ticketId}.txt`);
        const dateObj = new Date();

        const data = `[${dateObj}] ${author.username}#${author.discriminator}: \n${content}\n\n`;

        fs.appendFileSync(ticketTranscriptPath, data);
    }
});