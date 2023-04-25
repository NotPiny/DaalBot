const client = require('../../client.js');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const daalbot = require('../../daalbot.js');
const config = require('../../config.json');
const path = require('path');

client.on('messageDelete', async (message) => {
    try {
        const enabled = fs.readFileSync(path.resolve(`./db/logging/${message.guild.id}/MESSAGEDELETE.enabled`), 'utf8');
        if (enabled == 'true') {
            if (fs.existsSync(path.resolve(`./db/logging/${message.channel.guild.id}/MESSAGEDELETE.exclude`))) {
                const excluded = fs.readFileSync(path.resolve(`./db/logging/${message.channel.guild.id}/MESSAGEDELETE.exclude`), 'utf8').split('\n');
    
                if (excluded.includes(message.channel.id)) return;
            }

            if (!fs.existsSync(`./db/logging/${message.guild.id}/channel.id`)) return;

            const channelID = fs.readFileSync(path.resolve(`./db/logging/${message.guild.id}/channel.id`), 'utf8');
            const logChannel = client.channels.cache.get(channelID);

            const embed = new MessageEmbed()
                .setTitle('Message Deleted')
                .setDescription(`Message: ${message.content}\nAuthor: <@${message.author.id}>\nChannel: ${message.channel}`)
                .setThumbnail('https://pinymedia.web.app/daalbot/embed/thumbnail/logs/Message.png')
                .setColor('RED')
                .setTimestamp()

            logChannel.send({
                content: `Message Deleted`,
                embeds: [embed]
            })
        }
    } catch (err) {
        return;
    }
});