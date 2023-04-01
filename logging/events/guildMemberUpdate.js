const client = require('../../client.js');
const config = require('../../config.json');
const fs = require('fs');
const path = require('path');
const { MessageEmbed } = require('discord.js');
const daalbot = require('../../daalbot.js');

client.on('guildMemberUpdate', (oldMember, newMember) => {
    try {
        if (fs.existsSync(path.resolve(`./db/logging/${oldMember.guild.id}/roleUpdate.cooldown`))) {
            const text = fs.readFileSync(path.resolve(`./db/logging/${oldMember.guild.id}/roleUpdate.cooldown`), 'utf8');
            if (text == 'true') {
                // A role has been updated / deleted recently, so we don't want to log this event as it could result in spamming logs
                return;
            }
        }        
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
                changes.push(`Nickname: ${oldMember.nickname == null ? 'None' : oldMember.nickname} -> ${newMember.nickname}`);
            }

            if (oldMember.roles.cache.size !== newMember.roles.cache.size) {                
                newMember.roles.cache.forEach(role => {
                    if (!oldMember.roles.cache.has(role.id)) {
                        changes.push(`Added Role: ${role.name}`);
                    }
                });

                oldMember.roles.cache.forEach(role => {
                    if (!newMember.roles.cache.has(role.id)) {
                        changes.push(`Removed Role: ${role.name}`);
                    }
                });
            }

            if (oldMember.premiumSince !== newMember.premiumSince) {
                changes.push(`Premium Since: ${oldMember.premiumSince} -> ${newMember.premiumSince}`);
            }

            if (oldMember.pending !== newMember.pending) {
                changes.push(`Pending: ${oldMember.pending} -> ${newMember.pending}`);
            }

            if (oldMember.avatarURL() !== newMember.avatarURL()) {
                changes.push(`Server Avatar: ${oldMember.avatarURL() == null ? 'None' : `[Old](${oldMember.avatarURL()})`} -> ${newMember.avatarURL() == null ? 'None' : `[New](${newMember.avatarURL()})`}`);
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
            embed.setAuthor({
                name: `${oldMember.user.tag} (${oldMember.user.id})`,
                iconURL: oldMember.user.displayAvatarURL()
            })

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