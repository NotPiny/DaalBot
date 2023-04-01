const client = require('../../client.js');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');
const config = require('../../config.json');
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

        const joinRoles = [
            '976481244328108062',
            '974134097435852800',
            '1007106660109656104',
            '981069941795094588',
            '976478174986776666',
            '988976179031715930',
            '992703383205072977',
            '976478462284034088',
            '976479104570359809'
        ]

        joinRoles.forEach(role => {
            const roleObj = daalbot.getRole(member.guild.id, role);
            member.roles.add(roleObj)
            .then(() => {
                console.log(`Added "${roleObj.name}" to ${member.user.tag} in ${member.guild.name}`);
            })
            .catch(err => {
                console.log(err);
            });
        });

        // Ping the user in the rules channel
        const RulesChannel = daalbot.getChannel(member.guild.id, config.servers.vortex.channels.rules)

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