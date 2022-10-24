const client = require('../../client.js');
const config = require('../../config.json');
const fs = require('fs');
const path = require('path');
const { MessageEmbed } = require('discord.js');
const daalbot = require('../../daalbot.js');

client.on('guildMemberUpdate', async (oldMember, newMember) => {
    try {
        const enabled = fs.readFileSync(path.resolve(`./db/logging/${oldMember.guild.id}/GUILDMEMBERUPDATE.enabled`), 'utf8');
        if (enabled == 'true') {
            if (!fs.existsSync(`./db/logging/${oldMember.guild.id}/channel.id`)) return;

            const channelID = fs.readFileSync(path.resolve(`./db/logging/${oldMember.guild.id}/channel.id`), 'utf8');
            const logChannel = client.channels.cache.get(channelID);

            const embed = new MessageEmbed()
                .setTitle('User Updated')
                .setDescription(`**Before:**\nNickname: ${oldMember.nickname}\nRoles: ${oldMember.roles.cache.map(role => role.toString()).join(' ')}\n\n**After:**\nNickname: ${newMember.nickname}\nRoles: ${newMember.roles.cache.map(role => role.toString()).join(' ')}`)
                .setThumbnail(oldMember.user.displayAvatarURL())
                .setColor('YELLOW')
                .setTimestamp()

            logChannel.send({
                content: `User Updated`,
                embeds: [embed]
            })
        }
    } catch (err) {
        return;
    }
});