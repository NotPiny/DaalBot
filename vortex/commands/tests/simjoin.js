const client = require('../../../client.js');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const daalbot = require('../../../daalbot.js');
const config = require('../../../config.json');

client.on('messageCreate', msg => {
    if (msg.guild.id === '973711816226136095') {
        if (msg.content.toLowerCase().startsWith('$simjoin') && config.WOKCommands.BotOwners.includes(msg.author.id)) {
            client.emit('guildMemberAdd', msg.member);
        }
    }
})