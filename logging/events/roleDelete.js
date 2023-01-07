const client = require('../../client.js');
const config = require('../../config.json');
const fs = require('fs');
const path = require('path');
const { MessageEmbed } = require('discord.js');
const daalbot = require('../../daalbot.js');

client.on('roleDelete', async (role) => {
    try {
        if (fs.existsSync(path.resolve(`./db/logging/${oldRole.guild.id}/roleUpdate.cooldown`))) {
            const text = fs.readFileSync(path.resolve(`./db/logging/${oldRole.guild.id}/roleUpdate.cooldown`), 'utf8');
            if (text == 'true') {
                // Check if all that has changed is the position of the role
                if (oldRole.name == newRole.name && oldRole.color == newRole.color && oldRole.hoist == newRole.hoist && oldRole.mentionable == newRole.mentionable && oldRole.permissions == newRole.permissions) {
                    return;
                }
            } else {
                fs.writeFileSync(path.resolve(`./db/logging/${oldRole.guild.id}/roleUpdate.cooldown`), 'true');
                setTimeout(() => {
                    fs.writeFileSync(path.resolve(`./db/logging/${oldRole.guild.id}/roleUpdate.cooldown`), 'false');
                }, 5000);
            }
        } else {
            fs.appendFileSync(path.resolve(`./db/logging/${oldRole.guild.id}/roleUpdate.cooldown`), 'true');
            setTimeout(() => {
                fs.writeFileSync(path.resolve(`./db/logging/${oldRole.guild.id}/roleUpdate.cooldown`), 'false');
            }, 5000);
        }

        const enabled = fs.readFileSync(path.resolve(`./db/logging/${role.guild.id}/ROLEDELETE.enabled`), 'utf8');
        if (enabled == 'true') {
            if (!fs.existsSync(`./db/logging/${role.guild.id}/channel.id`)) return;

            const channelID = fs.readFileSync(path.resolve(`./db/logging/${role.guild.id}/channel.id`), 'utf8');
            const logChannel = client.channels.cache.get(channelID);

            const embed = new MessageEmbed()
                .setTitle('Role Deleted')
                .setDescription(`Role: ${role.name}\nID: ${role.id}`)
                .setThumbnail('https://pinymedia.web.app/daalbot/embed/thumbnail/logs/Role.png')
                .setColor('RED')
                .setTimestamp()

            logChannel.send({
                content: `Role Deleted`,
                embeds: [embed]
            })
        }
    } catch (err) {
        return;
    }
});