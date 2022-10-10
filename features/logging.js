const { Client } = require('discord.js')
const logSchema = require('../models/log-schema.js');

module.exports = ( Client ) => {
    Client.on('messageDelete', async (message) => {
        const { guild, author } = message
    
        const results = await logSchema.findById(guild.id)
        if (!results) return;
        if (author.bot) return;
    
        const { channelId } = results
        const channel = guild.channels.cache.get(channelId)
        channel.send(`A message was deleted :(\n\`\`\`Message:\n${message.content}\n\nAuthor:\n${author.tag}\`\`\``)
    })
}