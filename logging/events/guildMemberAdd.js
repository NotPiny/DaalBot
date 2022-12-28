const client = require('../../client.js');
const config = require('../../config.json');
const fs = require('fs');
const path = require('path');
const { MessageEmbed } = require('discord.js');
const daalbot = require('../../daalbot.js');

client.on('guildMemberAdd', async (member) => {
    try {
        const enabled = fs.readFileSync(path.resolve(`./db/logging/${member.guild.id}/GUILDMEMBERADD.enabled`), 'utf8');
        if (enabled == 'true') {
            if (!fs.existsSync(`./db/logging/${member.guild.id}/channel.id`)) return;

            const channelID = fs.readFileSync(path.resolve(`./db/logging/${member.guild.id}/channel.id`), 'utf8');
            const logChannel = client.channels.cache.get(channelID);

            const embed = new MessageEmbed()
                .setTitle('User Joined')
                .setDescription(`User: ${member.user.tag}\nID: ${member.user.id}`)
                .setThumbnail(member.user.displayAvatarURL())
                .setColor('GREEN')
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