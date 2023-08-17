const client = require('../../client.js');
const config = require('../../config.json');
const fs = require('fs');
const path = require('path');
const { EmbedBuilder } = require('discord.js');
const daalbot = require('../../daalbot.js');

client.on('guildMemberAdd', async (member) => {
    try {
        const enabled = fs.readFileSync(path.resolve(`./db/logging/${member.guild.id}/GUILDMEMBERADD.enabled`), 'utf8');
        if (enabled == 'true') {
            if (!fs.existsSync(`./db/logging/${member.guild.id}/channel.id`)) return;

            const channelID = fs.readFileSync(path.resolve(`./db/logging/${member.guild.id}/channel.id`), 'utf8');
            const logChannel = client.channels.cache.get(channelID);

            const embed = new EmbedBuilder()
                .setTitle('User Joined')
                .setDescription(`User: ${member.user.username}\nID: ${member.user.id}`)
                .setThumbnail(member.user.displayAvatarURL())
                .setColor('#57F28D')
                .setTimestamp()

            logChannel.send({
                content: `User Joined`,
                embeds: [embed]
            })
        }
    } catch (err) {
        return;
    }
});