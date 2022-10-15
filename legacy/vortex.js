//const stuff 
const client = require('../client'); // Loads all info needed to login as the bot 
const daalbot = require('../daalbot.js');
const warnSchema = require('../models/warn-schema');
const profanity = require('../db/automod/lists.json').profanityDefault

// If you want to see this code in action join the vortex discord server https://discord.gg/byBXVJbsYe

client.on("messageCreate", msg => {
    if (msg.guild.id === '973711816226136095') { // Checks if guild id is the same as the vortex server
        profanity.forEach(word => {
            if (msg.content.toLowerCase().includes(word)) {
                if (msg.channelId === '974533113042599966') return;
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
            }
        })
        if (msg.channel.id === '1005373380075192360') { // Checks if message was sent in the hi channel
            if (msg.author.id === client.user.id) return;
            if (msg.content.toLowerCase().startsWith('hi')) { // Checks if message begins with "hi"
                msg.channel.send('hi') // Sends "hi" to the channel
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
            }
        })
    }
})