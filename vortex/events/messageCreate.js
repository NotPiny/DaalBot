const client = require('../../client.js');
const config = require('../../config.json');

client.on('messageCreate', msg => {
    if (msg.guild.id !== config.servers.vortex.id) return;

    if (msg.channel.id === config.servers.vortex.channels.vortexChat) {
        if (msg.content.toLowerCase().includes('@everyone')) {
            msg.delete();
            msg.channel.send(`Dont you even... ${msg.author}`)
        }
    }
})