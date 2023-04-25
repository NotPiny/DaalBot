const client = require('../../client.js');
const config = require('../../config.json');
const fs = require('fs');
const path = require('path');
const { MessageEmbed } = require('discord.js');
const daalbot = require('../../daalbot.js');

client.on('messageDeleteBulk', async (messages) => {
    try {
        const enabled = fs.readFileSync(path.resolve(`./db/logging/${messages.first().guild.id}/MESSAGEDELETEBULK.enabled`), 'utf8');
        if (enabled == 'true') {
            if (fs.existsSync(path.resolve(`./db/logging/${messages.first().channel.guild.id}/MESSAGEDELETEBULK.exclude`))) {
                const excluded = fs.readFileSync(path.resolve(`./db/logging/${messages.first().channel.guild.id}/MESSAGEDELETEBULK.exclude`), 'utf8').split('\n');
    
                if (excluded.includes(messages.first().channel.id)) return;
            }

            if (!fs.existsSync(`./db/logging/${messages.first().guild.id}/channel.id`)) return;

            const channelID = fs.readFileSync(path.resolve(`./db/logging/${messages.first().guild.id}/channel.id`), 'utf8');
            const logChannel = client.channels.cache.get(channelID);

            const embed = new MessageEmbed()
                .setTitle('Bulk Messages Deleted')
                .setDescription(`Messages: ${messages.size}`)
                .setColor('RED')
                .setTimestamp()

            logChannel.send({
                content: `Bulk Messages Deleted`,
                embeds: [embed]
            })
        }
    } catch (err) {
        return;
    }
});