const client = require('../../client.js');
const config = require('../../config.json');
const fs = require('fs');
const Discord = require('discord.js');
const path = require('path');

client.on('emojiDelete', async(emoji) => {
    try {
    const enabled = fs.readFileSync(path.resolve(`./db/logging/${emoji.guild.id}/EMOJIDELETE.enabled`), 'utf8');
    if (enabled == 'true') {
        if (!fs.existsSync(`./db/logging/${emoji.guild.id}/channel.id`)) return;

        const channelID = fs.readFileSync(path.resolve(`./db/logging/${emoji.guild.id}/channel.id`), 'utf8');
        const logChannel = client.channels.cache.get(channelID);

        const embed = new Discord.MessageEmbed()
            .setTitle('Emoji Deleted')
            .setDescription(`Emoji: ${emoji.name}\nID: ${emoji.id}\nAnimated: ${emoji.animated}`)
            .setThumbnail(emoji.url)
            .setColor('RED')
            .setTimestamp()

        logChannel.send({
            content: `Emoji Deleted`,
            embeds: [embed]
        })
    }
} catch (err) {
    return;
}
});