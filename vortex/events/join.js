const client = require('../../client.js');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const config = require('../../config.json');
const daalbot = require('../../daalbot.js');

client.on('guildMemberAdd', member => {
    if (member.guild.id === '973711816226136095') {
        // Ping the user in the rules channel
        const RulesChannel = daalbot.getChannel('973711816226136095', config.servers.vortex.channels.rules)

        // Send the message
        RulesChannel.send(`<@${member.user.id}>`)
            .then(msg => {
                // Delete the message after 1 second
                setTimeout(() => {
                    msg.delete();
                }, 1000);
            })
    }
})