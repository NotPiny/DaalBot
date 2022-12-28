const client = require('../../client.js');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const daalbot = require('../../daalbot.js');
const config = require('../../config.json');
const path = require('path');

client.on('guildMemberRemove', async (member) => {
    try {
        const enabled = fs.readFileSync(path.resolve(`./db/logging/${member.guild.id}/GUILDMEMBERREMOVE.enabled`), 'utf8');
        if (enabled == 'true') {
            if (!fs.existsSync(`./db/logging/${member.guild.id}/channel.id`)) return;

            const channelID = fs.readFileSync(path.resolve(`./db/logging/${member.guild.id}/channel.id`), 'utf8');
            const logChannel = client.channels.cache.get(channelID);

            const embed = new MessageEmbed()
                .setTitle('User Left')
                .setDescription(`User: ${member.user.tag}\nID: ${member.user.id}`)
                .setThumbnail(member.user.displayAvatarURL())
                .setColor('RED')
                .setTimestamp()

            logChannel.send({
                content: `User Left`,
                embeds: [embed]
            })
        }
    } catch (err) {
        return;
    }
});