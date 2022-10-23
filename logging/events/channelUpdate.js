const client = require('../../client.js');
const config = require('../../config.json');
const fs = require('fs');
const Discord = require('discord.js');
const path = require('path');

client.on('channelUpdate', async(oldChannel, newChannel) => {
    if (oldChannel.type === 'DM') return;
    if (newChannel.type === 'DM') return;
    try {
    console.log(`Channel Updated: ${oldChannel.name} (${oldChannel.id})`);
    const enabled = fs.readFileSync(path.resolve(`./db/logging/${oldChannel.guild.id}/CHANNELUPDATE.enabled`), 'utf8');
    if (enabled == 'true') {
        if (!fs.existsSync(`./db/logging/${oldChannel.guild.id}/channel.id`)) return;

        const channelID = fs.readFileSync(path.resolve(`./db/logging/${oldChannel.guild.id}/channel.id`), 'utf8');
        const logChannel = client.channels.cache.get(channelID);

        const embed = new Discord.MessageEmbed()
            .setTitle('Channel Updated')
            .setDescription(`**Before**\nChannel: ${oldChannel.name}\nType: ${oldChannel.type}\n\n**After**\nChannel: ${newChannel.name}\nType: ${newChannel.type}`)
            .setThumbnail('https://pinymedia.web.app/hashtag.png')
            .setColor('YELLOW')
            .setTimestamp()

        logChannel.send({
            content: `Channel Updated`,
            embeds: [embed]
        })
    }
} catch (err) {
    return;
}
});