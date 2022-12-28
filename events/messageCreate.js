const client = require('../client.js');
const daalbot = require('../daalbot.js');
const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');

client.on('messageCreate', async (msg) => {
    const channel = msg.channel;
    const content = msg.content;
    const author = msg.author;
    const guild = msg.guild;
    let channelName = '';
    if (channel.name) {
        channelName = channel.name;
    }

    if (channelName.startsWith('ticket-')) {
        const ticketId = channelName.replace('ticket-', '');

        if (!fs.existsSync(path.resolve(`./db/tickets/${guild.id}/${ticketId}.ticket`))) return;

        const ticketTranscriptPath = path.resolve(`./db/tickets/${guild.id}/${ticketId}.txt`);
        const dateObj = new Date();

        const data = `[${dateObj}] ${author.username}#${author.discriminator}: \n${content}\n\n`;

        fs.appendFileSync(ticketTranscriptPath, data);
    }

    if (author.bot && author.id == '1050916041523482766') {
        const issueAuthorId = content.split('> **id**: ')[1].split('>')[0].trim();

        const issueAuthorUser = daalbot.getUser(issueAuthorId);

        if (issueAuthorUser == undefined) return console.log(`Couldn't find user with id ${issueAuthorId}!`);
        if (issueAuthorUser == 'User not found.') return console.log(`Couldn't find user with id ${issueAuthorId}!`);

        try {
            const embed = new Discord.MessageEmbed()
                .setTitle('Issue received!')
                .setDescription('We have received your issue and will be looking into it shortly.')
                .setColor('PURPLE')
                .setFooter({
                    text: 'DaalBot',
                    iconURL: 'https://pinymedia.web.app/DaalbotCircle.png'
                })
                .setTimestamp();
            
            await issueAuthorUser.send({
                content: `Hey ${issueAuthorUser.username}!`,
                embeds: [embed]
            });

            const userInfoEmbed = new Discord.MessageEmbed()
                .setTitle('User info')
                .setDescription(`Username: ${issueAuthorUser.username}
Discriminator: ${issueAuthorUser.discriminator}
ID: ${issueAuthorUser.id}`)
                .setColor('PURPLE')
                .setThumbnail(issueAuthorUser.avatarURL() == null ? 'https://pinymedia.web.app/DaalbotCircle.png' : issueAuthorUser.avatarURL())
                .setTimestamp();

            await msg.channel.send({
                content: `Info about user <@${issueAuthorId}>:`,
                embeds: [userInfoEmbed],
                allowedMentions: []
            });
        } catch (e) {
            console.log(`Something went wrong while sending a message to ${issueAuthorUser.tag}`)
        }
    }
});