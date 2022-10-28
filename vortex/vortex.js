//const stuff 
const client = require('../client'); // Loads all info needed to login as the bot 
const daalbot = require('../daalbot.js');
const warnSchema = require('../models/warn-schema');
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');
const DJS = require('discord.js');
const fs = require('fs');
function AutomodLog(word, message) {
    const embed = new MessageEmbed()
        .setTitle('Info')
        .setDescription(`**Message:** ${message.content}\n**Word:** ${word}\n**User:** ${message.author.tag}\n**Channel:** ${message.channel}`)
        .setTimestamp()
        .setColor('RED')
    daalbot.getChannel('973711816226136095', '974376513891860511').send({
        content: 'Automod blocked a message.',
        embeds: [embed]
    })
}

// Loading commands
require('./commands/featured/command.js');
require('./commands/tests/simjoin.js');
require('./commands/tests/ticket-drop.js');

// Loading events
require('./events/join.js');

// If you want to see this code in action join the vortex discord server https://discord.gg/byBXVJbsYe

client.on("messageCreate", msg => {
    if (msg.guild.id === '973711816226136095') { // Checks if guild id is the same as the vortex server
        const profanity = require('../db/automod/lists.json').profanityDefault; // Loads the profanity list
        if (msg.author.id == '752363621723537598') {
            if (msg.content.includes(':eyes:')) return msg.delete();
        }
        profanity.forEach(word => {
            // Check if the user has the bypass role
            // if (msg.member.roles.cache.has('974376513891860511')) return;
            if (msg.content.toLowerCase().includes(word)) {
                if (msg.channelId === '974533113042599966') return;
                // if (daalbot.getChannel(msg.guildId, msg.channelId).parentId == [
                //     '975404577232928808',
                //     '974532542541742090'
                // ])
            msg.delete()
            .then(() => {
                console.log(`Deleted message from ${msg.author.tag} in ${msg.guild.name} for saying ${word}`)
            })
            .catch(() => {
                console.log(`Failed to delete message from ${msg.author.tag} in ${msg.guild.name} for saying ${word}`)
            })
            warnSchema.create({
                userId: msg.author.id,
                staffId: client.user.id,
                guildId: msg.guildId,
                reason: 'Automod: Profanity'
            })
            .then(() => {
                console.log(`Warned ${msg.author.tag} in ${msg.guild.name} for saying ${word}`)
            })
            .catch(() => {
                console.log(`Failed to warn ${msg.author.tag} in ${msg.guild.name} for saying ${word}`)
            })
            msg.channel.send(`Hey <@${msg.author.id}>, please don't use that word!`); // Sends a message to the channel
            AutomodLog(word, msg); // Sends a message to the automod log channel
            }
        })
        if (msg.channel.id === '1005373380075192360') { // Checks if message was sent in the hi channel
            if (msg.content.toLowerCase().startsWith('hi')) { // Checks if message begins with "hi"
                if (msg.author.id === client.user.id) return; // Checks if the author is the bot
                // const hi = fs.readFileSync('./data/hi.amount', 'utf8'); // Reads the current hi count
                // const newHi = parseInt(hi) + 1; // Adds 1 to the hi count
                // fs.writeFileSync('./data/hi.amount', newHi); // Writes the new hi count
                // msg.channel.setTopic(`Hi Count: ${newHi}`); // Sets the hi channel topic to the new hi count
                msg.channel.send('hi') // Sends "hi" to the channel
            } else {
                msg.delete(); // Deletes the message if it doesn't start with "hi"
            }
        } else if (msg.channel.id === '974375088642228344') {
            if (msg.author.id === client.user.id) return;
            if (!msg.author.bot) return;

            msg.channel.send('<@&981065134569029652>')
        }
    } else {
        return // Returns if guild id does not match
    }
})

client.on('messageUpdate', (oldMessage, newMessage) => {
    if (oldMessage.guild.id === '973711816226136095') {
        const profanity = require('../db/automod/lists.json').profanityDefault; // Loads the profanity list
        profanity.forEach(word => {
            if (newMessage.content.toLowerCase().includes(word)) {
                if (newMessage.channelId === '974533113042599966') return;
            newMessage.delete()
            .then(() => {
                console.log(`Deleted message from ${newMessage.author.tag} in ${newMessage.guild.name} for saying ${word}`)
            })
            .catch(() => {
                console.log(`Failed to delete message from ${newMessage.author.tag} in ${newMessage.guild.name} for saying ${word}`)
            })
            warnSchema.create({
                userId: newMessage.author.id,
                staffId: client.user.id,
                guildId: newMessage.guildId,
                reason: 'Automod: Profanity'
            })
            .then(() => {
                console.log(`Warned ${newMessage.author.tag} in ${newMessage.guild.name} for saying ${word}`)
            })
            .catch(() => {
                console.log(`Failed to warn ${newMessage.author.tag} in ${newMessage.guild.name} for saying ${word}`)
            })
            newMessage.channel.send(`Hey <@${newMessage.author.id}>, please don't use that word!`); // Sends a message to the channel
            AutomodLog(word, newMessage); // Sends a message to the automod log channel
            }
        })
    }
})