const client = require('../../client.js');
const config = require('../../config.json');
const fs = require('fs');
const path = require('path');
const { MessageEmbed } = require('discord.js');
const daalbot = require('../../daalbot.js');

client.on('guildMemberUpdate', (oldMember, newMember) => {
    try {
        const enabled = fs.readFileSync(path.resolve(`./db/logging/${oldMember.guild.id}/GUILDMEMBERUPDATE.enabled`), 'utf8');
        if (enabled == 'true') {
            if (!fs.existsSync(`./db/logging/${oldMember.guild.id}/channel.id`)) return;

            const channelID = fs.readFileSync(path.resolve(`./db/logging/${oldMember.guild.id}/channel.id`), 'utf8');
            const logChannel = client.channels.cache.get(channelID);

            const embed = new MessageEmbed()
                .setTitle('User Updated')
                .setThumbnail(oldMember.user.displayAvatarURL())
                .setColor('YELLOW')
                .setTimestamp()

            let changes = [];

            if (oldMember.nickname !== newMember.nickname) {
                changes.push(`Nickname: ${oldMember.nickname} -> ${newMember.nickname}`);
            }

            if (oldMember.roles.cache.size !== newMember.roles.cache.size) {
                changes.push(`Roles: ${oldMember.roles.cache.size - 1} -> ${newMember.roles.cache.size - 1}`);
            }

            if (oldMember.premiumSince !== newMember.premiumSince) {
                changes.push(`Premium Since: ${oldMember.premiumSince} -> ${newMember.premiumSince}`);
            }

            if (oldMember.pending !== newMember.pending) {
                changes.push(`Pending: ${oldMember.pending} -> ${newMember.pending}`);
            }

            if (oldMember.avatarURL() !== newMember.avatarURL()) {
                changes.push(`Server Avatar: ${oldMember.avatarURL()} -> ${newMember.avatarURL()}`);
                embed.setThumbnail(newMember.avatarURL());
            }

            if (oldMember.displayHexColor !== newMember.displayHexColor) {
                changes.push(`Color: ${oldMember.displayHexColor} -> ${newMember.displayHexColor}`);
            }

            if (oldMember.isCommunicationDisabled() !== newMember.isCommunicationDisabled()) {
                changes.push(`Communication Disabled: ${oldMember.isCommunicationDisabled()} -> ${newMember.isCommunicationDisabled()}`);
            }

            let description = '';

            changes.forEach(change => {
                description += `${change}\n`;
            });

            embed.setDescription(description);

            if (description.length == 0) return;

            if (description.length >= 4000) {
                embed.setDescription('Error: Too many changes to display.');
            }

            logChannel.send({
                content: `User Updated`,
                embeds: [embed]
            })
        }
    } catch (err) {
        return;
    }
});