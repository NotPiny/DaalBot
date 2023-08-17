const client = require('../../client.js');
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const daalbot = require('../../daalbot.js');
const config = require('../../config.json');
const path = require('path');

client.on('messageDelete', async (message) => {
    try {
        const enabled = fs.readFileSync(path.resolve(`./db/logging/${message.guild.id}/MESSAGEDELETE.enabled`), 'utf8');
        if (enabled == 'true') {
            if (fs.existsSync(path.resolve(`./db/logging/${message.channel.guild.id}/MESSAGEDELETE.exclude`))) {
                const excluded = fs.readFileSync(path.resolve(`./db/logging/${message.channel.guild.id}/MESSAGEDELETE.exclude`), 'utf8').split('\n');
    
                if (excluded.includes(message.channel.id)) return;
            }

            if (!fs.existsSync(`./db/logging/${message.guild.id}/channel.id`)) return;

            const channelID = fs.readFileSync(path.resolve(`./db/logging/${message.guild.id}/channel.id`), 'utf8');
            const logChannel = client.channels.cache.get(channelID);

            const embed = new EmbedBuilder()
                .setTitle('Message Deleted')
                .setDescription(`<:icon_Person:1043647937487589446> <@${message.author.id}>\n<:discordReply:1043869882921533450> <#${message.channel.id}>\n\n<:Message:1117915334855360532> ${message.content}\n\n<:Trash:1118100123713540118> <@${message.author.id}> or a bot[*](https://pastebin.com/u0RjF7j8)`)
                .setThumbnail('https://pinymedia.web.app/daalbot/embed/thumbnail/logs/Message.png')
                .setColor('#EF3D48')
                .setTimestamp();

            const latestAuditLog = await message.guild.fetchAuditLogs().then(audit => audit.entries.first());
    
            if (latestAuditLog.action == 'MESSAGE_DELETE') {
                if (latestAuditLog.targetId == message.author.id) {
                    try {
                        // Message wasnt deleted by a bot or the author
                        const executor = latestAuditLog?.executorId;
            
                        embed.setDescription(`<:icon_Person:1043647937487589446> <@${message.author.id}>\n<:discordReply:1043869882921533450> <#${message.channel.id}>\n\n<:Message:1117915334855360532> ${message.content}\n\n<:Trash:1118100123713540118> <@${executor}>[*](https://pastebin.com/u0RjF7j8)`)
                    } catch (error) {
                        console.error(error);
                    }
                }
            }
            
            logChannel.send({
                content: `Message Deleted`,
                embeds: [embed]
            })
        }
    } catch (err) {
        return;
    }
});