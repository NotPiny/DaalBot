const client = require('../../client.js');
const config = require('../../config.json');
const fs = require('fs');
const Discord = require('discord.js');
const path = require('path');

client.on('channelCreate', async(channel) => {
    if (channel.type === 'DM') return;
    try {
        if (!fs.existsSync(path.resolve(`./db/logging/${channel.guild.id}/CHANNELCREATE.enabled`))) return;
        const enabled = fs.readFileSync(path.resolve(`./db/logging/${channel.guild.id}/CHANNELCREATE.enabled`), 'utf8');
        if (enabled == 'true') {
            if (!fs.existsSync(`./db/logging/${channel.guild.id}/channel.id`)) return;

            const channelID = fs.readFileSync(path.resolve(`./db/logging/${channel.guild.id}/channel.id`), 'utf8');
            const logChannel = client.channels.cache.get(channelID);

            const embed = new Discord.MessageEmbed()
                .setTitle('Channel Created')
                .setDescription(`Channel: ${channel.name}\nID: ${channel.id}\nType: ${channel.type}`)
                .setThumbnail('https://pinymedia.web.app/daalbot/embed/thumbnail/logs/Channel.png')
                .setColor('GREEN')
                .setTimestamp()

            logChannel.send({
                content: `Channel Created`,
                embeds: [embed]
            })
    }
} catch (err) {
    return;
}
})