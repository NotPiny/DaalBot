const client = require('../../client.js');
const config = require('../../config.json');
const fs = require('fs');
const path = require('path');
const { MessageEmbed } = require('discord.js');
const daalbot = require('../../daalbot.js');

client.on('messageUpdate', async (oldMessage, newMessage) => {
    try {
        const enabled = fs.readFileSync(path.resolve(`./db/logging/${oldMessage.guild.id}/MESSAGEUPDATE.enabled`), 'utf8');
        if (enabled == 'true') {
            if (fs.existsSync(path.resolve(`./db/logging/${oldMessage.channel.guild.id}/MESSAGEDELETE.exclude`))) {
                const excluded = fs.readFileSync(path.resolve(`./db/logging/${oldMessage.channel.guild.id}/MESSAGEDELETE.exclude`), 'utf8').split('\n');
    
                if (excluded.includes(oldMessage.channel.id)) return;
            }

            if (!fs.existsSync(`./db/logging/${oldMessage.guild.id}/channel.id`)) return;
            if (oldMessage.author.bot) return;

            const channelID = fs.readFileSync(path.resolve(`./db/logging/${oldMessage.guild.id}/channel.id`), 'utf8');
            const logChannel = client.channels.cache.get(channelID);
            const description = `**Before**
            Content: ${oldMessage.content}
            Embeds: ${oldMessage.embeds.length}
            Attachments: ${oldMessage.attachments.size}
            Components: ${oldMessage.components.length}
            
            **After**
            Content: ${newMessage.content}
            Embeds: ${newMessage.embeds.length}
            Attachments: ${newMessage.attachments.size}
            Components: ${newMessage.components.length}`;

            const embed = new MessageEmbed()
                .setTitle('Message Edited')
                .setDescription(description)
                .setThumbnail('https://pinymedia.web.app/daalbot/embed/thumbnail/logs/Message.png')
                .setColor('YELLOW')
                .setTimestamp()

            if (description.length >= 4000) {
                embed.setDescription('Data too long to display.');
            }

            logChannel.send({
                content: `Message Edited`,
                embeds: [embed]
            })
        }
    } catch (err) {
        return;
    }
});