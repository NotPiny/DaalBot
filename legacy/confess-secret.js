const client = require('../client');
const { MessageEmbed } = require('discord.js')
const config = require('../config.json')

client.on('messageCreate', message => {
    if (message.content.toLowerCase().startsWith(`${config.prefix}confess-secret`)) {
        if (message.deletable) {
            const msg = message;
            const confession = msg.content.replace(/confess-secret/, '').slice(2)
            const embed = new MessageEmbed()
            .setTitle('Confession')
            .setDescription(confession)
            msg.delete();
            msg.channel.send({
                embeds: [
                    embed
                ]
            })
        } else {
            console.log('Message not deletable');
            message.reply('Can not delete due to perms');
        }
    }
})