const client = require('../client.js');
const DJS = require('discord.js');
const daalbot = require('../daalbot.js');

const alertRoles = {
    'botpomelo': '1145055821839999017',
    'ohdownalert': '1145055658585096233'
}

const monitoringGuild = daalbot.fetchServer('1119698500440035439');
const logChannel = daalbot.getChannel(monitoringGuild.id, '1119698501815783434');

client.on('guildMemberUpdate', (oldMember, newMember) => {
    // Check if its in the monitoring guild
    if (newMember.guild.id !== 'id') return;

    // Bot pomelo check
    if (newMember.id === '159985870458322944') {
        // Bot is mee6 🤮
        if (newMember.user.discriminator !== '4876') {
            // Mee6 (probably) has a new pomelo type name
            const embed = new DJS.EmbedBuilder()
                .setTitle('Mee6 has changed to new username system')
                .setDescription(`# New tag\n\`\`\`${newMember.user.tag}\`\`\`\n# Old tag\n\`\`\`${oldMember.user.tag}\`\`\``)
                .setColor('Green')
                .setTimestamp()

            logChannel.send({
                content: `<@&${alertRoles.botpomelo}> Bots are getting pomelo names!`,
                embeds: [embed]
            });
        }
    }
})

setInterval(() => {
    // Execute every 5 minutes
    const olilzHelper = daalbot.getMember(monitoringGuild, '951587858962079778');

    if (olilzHelper == 'Member not found.') return console.error('Olilz helper not found.');
    if (olilzHelper == 'Server not found.') return console.error('Monitoring server not found.');
    if (olilzHelper == undefined) return console.error('Olilz helper is undefined.');

    if (olilzHelper.presence.status === 'offline') {
        // Olilz helper is offline
        const embed = new DJS.EmbedBuilder()
            .setTitle('Olilz helper is offline')
            .setDescription('Olilz is a bot and his bot is offline. This is not good.')
            .setColor('Red')
            .setTimestamp();

        logChannel.send({
            content: `<@&${alertRoles.ohdownalert}> Olilz helper is offline!`,
            embeds: [embed]
        });
    }
}, 5 * 60 * 1000)