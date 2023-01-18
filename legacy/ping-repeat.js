const client = require('../client');
const config = require('../config.json');

client.on("messageCreate", msg => {
    if (msg.content.toLowerCase().startsWith('$ping-repeat')) {
        if (config.WOKCommands.BotOwners.includes(msg.author.id)) {
            const args = msg.content.replace('$ping-repeat ', '').split(' ');
            const user = msg.mentions.users.first();

            if (!user == undefined) {
                return msg.channel.send('Please specify a user to ping.');
            } else {
                if (msg.content.toLowerCase().includes('-a')) {
                    msg.delete();
                    for (let i = 0; i < args[1]; i++) {
                        setTimeout(() => {
                            msg.channel.send(`<@${user.id}>`)
                                .then(message => {
                                    if (msg.content.toLowerCase().endsWith('-d')) {
                                        message.delete()
                                            .catch(console.warn)
                                    }
                                })
                        }, 2.5 * 1000);
                    }
                } else {
                    for (let i = 0; i < args[1]; i++) {
                        setTimeout(() => {
                            msg.channel.send(`<@${user.id}> roses are red, violets are blue, ${msg.author.username} spam pings you.`);
                        }, 2.5 * 1000);
                    }
                }
            }
        }
    }
})