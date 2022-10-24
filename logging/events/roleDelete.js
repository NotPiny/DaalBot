const client = require('../../client.js');
const config = require('../../config.json');
const fs = require('fs');
const path = require('path');
const { MessageEmbed } = require('discord.js');
const daalbot = require('../../daalbot.js');

client.on('roleDelete', async (role) => {
    try {
        const enabled = fs.readFileSync(path.resolve(`./db/logging/${role.guild.id}/ROLEDELETE.enabled`), 'utf8');
        if (enabled == 'true') {
            if (!fs.existsSync(`./db/logging/${role.guild.id}/channel.id`)) return;

            const channelID = fs.readFileSync(path.resolve(`./db/logging/${role.guild.id}/channel.id`), 'utf8');
            const logChannel = client.channels.cache.get(channelID);

            const embed = new MessageEmbed()
                .setTitle('Role Deleted')
                .setDescription(`Role: ${role.name}\nID: ${role.id}`)
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