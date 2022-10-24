const client = require('../../client.js');
const config = require('../../config.json');
const fs = require('fs');
const path = require('path');
const { MessageEmbed } = require('discord.js');
const daalbot = require('../../daalbot.js');

client.on('messageUpdate', async (oldMessage, newMessage) => {
    try {
        const enabled = fs.readFileSync(path.resolve(`./db/logging/${oldMessage.guild.id}/MESSAGEUPDATE.enabled`), 'utf8');
        if (enabled == 'true') {
            if (!fs.existsSync(`./db/logging/${oldMessage.guild.id}/channel.id`)) return;
            if (oldMessage.author.bot) return;

            const channelID = fs.readFileSync(path.resolve(`./db/logging/${oldMessage.guild.id}/channel.id`), 'utf8');
            const logChannel = client.channels.cache.get(channelID);

            const embed = new MessageEmbed()
                .setTitle('Message Edited')
                .setDescription(`Message: ${oldMessage.content}\nNew Message: ${newMessage.content}`)
                .setThumbnail(oldMessage.author.displayAvatarURL())
                .setColor('YELLOW')
                .setTimestamp()

            logChannel.send({
                content: `Message Edited`,
                embeds: [embed]
            })
        }
    } catch (err) {
        return;
    }
});