const client = require('../../client.js');
const config = require('../../config.json');
const fs = require('fs');
const Discord = require('discord.js');
const path = require('path');

client.on('channelDelete', async(channel) => {
    if (channel.type === Discord.ChannelType.DM) return;
    try {
    const enabled = fs.readFileSync(path.resolve(`./db/logging/${channel.guild.id}/CHANNELDELETE.enabled`), 'utf8');
    if (enabled == 'true') {
        if (!fs.existsSync(`./db/logging/${channel.guild.id}/channel.id`)) return;

        const channelID = fs.readFileSync(path.resolve(`./db/logging/${channel.guild.id}/channel.id`), 'utf8');
        const logChannel = client.channels.cache.get(channelID);

        const embed = new Discord.EmbedBuilder()
            .setTitle('Channel Deleted')
            .setDescription(`Channel: ${channel.name}\nID: ${channel.id}\nType: ${channel.type}`)
            .setThumbnail('https://pinymedia.web.app/daalbot/embed/thumbnail/logs/Channel.png')
            .setColor('#EF3D48')
            .setTimestamp()

        logChannel.send({
            content: `Channel Deleted`,
            embeds: [embed]
        })
    }
} catch (err) {
    return;
}
})