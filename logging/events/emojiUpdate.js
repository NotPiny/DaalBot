const client = require('../../client.js');
const config = require('../../config.json');
const fs = require('fs');
const Discord = require('discord.js');
const path = require('path');

client.on('emojiUpdate', async(oldEmoji, newEmoji) => {
    try {
    const enabled = fs.readFileSync(path.resolve(`./db/logging/${oldEmoji.guild.id}/EMOJIUPDATE.enabled`), 'utf8');
    if (enabled == 'true') {
        if (!fs.existsSync(`./db/logging/${oldEmoji.guild.id}/channel.id`)) return;

        const channelID = fs.readFileSync(path.resolve(`./db/logging/${oldEmoji.guild.id}/channel.id`), 'utf8');
        const logChannel = client.channels.cache.get(channelID);

        const embed = new Discord.MessageEmbed()
            .setTitle('Emoji Updated')
            .setDescription(`**Before**\nEmoji: ${oldEmoji.name}\nAnimated: ${oldEmoji.animated}\n\n**After**\nEmoji: ${newEmoji.name}\nAnimated: ${newEmoji.animated}`)
            .setThumbnail(oldEmoji.url)
            .setColor('YELLOW')
            .setTimestamp()

        logChannel.send({
            content: `Emoji Updated`,
            embeds: [embed]
        })
    }
} catch (err) {
    return;
}
});