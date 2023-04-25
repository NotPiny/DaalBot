const client = require('../../client.js');
const config = require('../../config.json');
const fs = require('fs');
const Discord = require('discord.js');
const path = require('path');

client.on('channelUpdate', async(oldChannel, newChannel) => {
    if (oldChannel.type === 'DM') return;
    if (newChannel.type === 'DM') return;
    try {
        const oldRole = oldChannel;
        if (fs.existsSync(path.resolve(`./db/logging/${oldRole.guild.id}/channelUpdate.cooldown`))) {
            const text = fs.readFileSync(path.resolve(`./db/logging/${oldRole.guild.id}/channelUpdate.cooldown`), 'utf8');
            if (text == 'true') {
                return;
            } else {
                fs.writeFileSync(path.resolve(`./db/logging/${oldRole.guild.id}/channelUpdate.cooldown`), 'true');
                setTimeout(() => {
                    fs.writeFileSync(path.resolve(`./db/logging/${oldRole.guild.id}/channelUpdate.cooldown`), 'false');
                }, 1000);
            }
        } else {
            fs.appendFileSync(path.resolve(`./db/logging/${oldRole.guild.id}/channelUpdate.cooldown`), 'true');
            setTimeout(() => {
                fs.writeFileSync(path.resolve(`./db/logging/${oldRole.guild.id}/channelUpdate.cooldown`), 'false');
            }, 1000);
        }
    console.log(`Channel Updated: ${oldChannel.name} (${oldChannel.id})`);
    const enabled = fs.readFileSync(path.resolve(`./db/logging/${oldChannel.guild.id}/CHANNELUPDATE.enabled`), 'utf8');
    if (enabled == 'true') {
        if (fs.existsSync(path.resolve(`./db/logging/${oldChannel.guild.id}/CHANNELUPDATE.exclude`))) {
            const excluded = fs.readFileSync(path.resolve(`./db/logging/${oldChannel.guild.id}/CHANNELUPDATE.exclude`), 'utf8').split('\n');

            if (excluded.includes(oldChannel.id)) return;
        }

        if (!fs.existsSync(`./db/logging/${oldChannel.guild.id}/channel.id`)) return;

        const channelID = fs.readFileSync(path.resolve(`./db/logging/${oldChannel.guild.id}/channel.id`), 'utf8');
        const logChannel = client.channels.cache.get(channelID);

        const embed = new Discord.MessageEmbed()
            .setTitle('Channel Updated')
            .setDescription(`
            **Before**
            Name: ${oldChannel.name}
            Type: ${oldChannel.type}
            Topic: ${oldChannel.topic}
            Position: ${oldChannel.rawPosition}
            Category: ${oldChannel.parent.name ? oldChannel.parent.name : 'None'} / ${oldChannel.parent.id ? oldChannel.parent.id : 'None'}
            
            **After**
            Name: ${newChannel.name}
            Type: ${newChannel.type}
            Topic: ${newChannel.topic}
            Position: ${newChannel.rawPosition}
            Category: ${newChannel.parent.name ? newChannel.parent.name : 'None'} / ${newChannel.parent.id ? newChannel.parent.id : 'None'}
            `)
            .setThumbnail('https://pinymedia.web.app/daalbot/embed/thumbnail/logs/Channel.png')
            .setColor('YELLOW')
            .setTimestamp()

        logChannel.send({
            content: `Channel Updated`,
            embeds: [embed]
        })
    }
} catch (err) {
    return;
}
});