const client = require('../../client.js');
const config = require('../../config.json');
const fs = require('fs');
const path = require('path');
const { MessageEmbed } = require('discord.js');
const daalbot = require('../../daalbot.js');

client.on('roleUpdate', (oldRole, newRole) => {
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

        const enabled = fs.readFileSync(path.resolve(`./db/logging/${oldRole.guild.id}/ROLEUPDATE.enabled`), 'utf8');
        if (enabled == 'true') {
            if (!fs.existsSync(`./db/logging/${oldRole.guild.id}/channel.id`)) return;

            const channelID = fs.readFileSync(path.resolve(`./db/logging/${oldRole.guild.id}/channel.id`), 'utf8');
            const logChannel = client.channels.cache.get(channelID);

            if (logChannel.type == 'DM') return;
            if (logChannel == undefined) return;

            const embed = new MessageEmbed()
                .setTitle('Role Updated')
                .setDescription(`
                **Before**
                Name: ${oldRole.name}
                Color: ${oldRole.hexColor}
                Hoisted: ${oldRole.hoist}
                Mentionable: ${oldRole.mentionable}
                Position: ${oldRole.rawPosition}\n
                **After**
                Name: ${newRole.name}
                Color: ${newRole.hexColor}
                Hoisted: ${newRole.hoist}
                Mentionable: ${newRole.mentionable}
                Position: ${newRole.rawPosition}


                **IDs:**
                Role: ${newRole.id}
                `)
                .setThumbnail('https://pinymedia.web.app/daalbot/embed/thumbnail/logs/Role.png')
                .setColor('YELLOW')
                .setTimestamp()

            logChannel.send({
                content: `Role Updated`,
                embeds: [embed]
            })
            .then(msg => {
                console.log(`Sent message to ${logChannel.name} in ${logChannel.guild.name}`);
            })
            .catch(err => {
                console.log(err);
            })
        }
    } catch (err) {
        return;
    }
});