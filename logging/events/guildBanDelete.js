const client = require('../../client.js');
const config = require('../../config.json');
const fs = require('fs');
const path = require('path');
const { EmbedBuilder } = require('discord.js');
const daalbot = require('../../daalbot.js');

client.on('guildBanRemove', async (ban, other) => {
    try {
        const enabled = fs.readFileSync(path.resolve(`./db/logging/${ban.guild.id}/GUILDBANREMOVE.enabled`), 'utf8');
        if (enabled == 'true') {
            if (!fs.existsSync(`./db/logging/${ban.guild.id}/channel.id`)) return;

            const channelID = fs.readFileSync(path.resolve(`./db/logging/${ban.guild.id}/channel.id`), 'utf8');
            const logChannel = client.channels.cache.get(channelID);

            const embed = new EmbedBuilder()
                .setTitle('User Unbanned')
                .setDescription(`User: ${ban.user.tag}\nID: ${ban.user.id}`)
                .setThumbnail(ban.user.displayAvatarURL())
                .setColor('#57F28D')
                .setTimestamp()

            logChannel.send({
                content: `User Unbanned`,
                embeds: [embed]
            })
        }
    } catch (err) {
        return;
    }
});