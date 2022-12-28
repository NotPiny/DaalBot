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
            if (!fs.existsSync(`./db/logging/${message.guild.id}/channel.id`)) return;

            const channelID = fs.readFileSync(path.resolve(`./db/logging/${message.guild.id}/channel.id`), 'utf8');
            const logChannel = client.channels.cache.get(channelID);

            const embed = new MessageEmbed()
                .setTitle('Message Deleted')
                .setDescription(`Message: ${message.content}\nAuthor: ${message.author.tag}\nChannel: ${message.channel}`)
                .setThumbnail(message.author.displayAvatarURL())
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