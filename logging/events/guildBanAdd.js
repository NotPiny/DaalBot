const client = require('../../client.js');
const config = require('../../config.json');
const fs = require('fs');
const path = require('path');
const { MessageEmbed } = require('discord.js');
const daalbot = require('../../daalbot.js');

client.on('guildBanAdd', async (ban, other) => {
    try {
        const enabled = fs.readFileSync(path.resolve(`./db/logging/${ban.guild.id}/GUILDBANADD.enabled`), 'utf8');
        if (enabled == 'true') {
            if (!fs.existsSync(`./db/logging/${ban.guild.id}/channel.id`)) return;

            const channelID = fs.readFileSync(path.resolve(`./db/logging/${ban.guild.id}/channel.id`), 'utf8');
            const logChannel = client.channels.cache.get(channelID);

            const embed = new MessageEmbed()
                .setTitle('User Banned')
                .setDescription(`
                User: ${ban.user.tag}
                ID: ${ban.user.id}
                `)
                .setThumbnail(ban.user.displayAvatarURL())
                .setColor('RED')
                .setTimestamp()

            logChannel.send({
                content: `User Banned`,
                embeds: [embed]
            })
        }
    } catch (err) {
        return;
    }
});