const client = require('../../client.js');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const daalbot = require('../../daalbot.js');

client.on('guildMemberAdd', member => {
    if (member.guild.id === '973711816226136095') {
        const welcomeEmbed = new MessageEmbed()
            .setTitle('Welcome to the server!')
            .setDescription(`Welcome to the Vortex Discord server, ${member.user.username}!\nPlease read the rules in <#974371315836399657>\n\nYou are member #${member.guild.memberCount}!`)
            .setImage('https://pinymedia.web.app/VortexWelcome.png')
            .setThumbnail('https://pinymedia.web.app/VortexIcon.png')
            .setTimestamp()
            .setColor('BLUE');

        daalbot.getChannel(member.guild.id, '974371203160604672').send({
            content: `Welcome to the server, <@${member.user.id}>!`,
            embeds: [welcomeEmbed]
        });
    }
})