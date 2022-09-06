const client = require('../client'); require('dotenv').config();
const { MessageEmbed } = require('discord.js')

client.on('guildMemberAdd', member => {
    if (member.guild.id === '747728787797573656') {
        const Embed = new MessageEmbed()
        .setImage(member.avatarURL)
        .setTitle('Welcome to the server!')
        .setDescription(`Be sure to read the <#747729414162350122> and get you <#863114801067851837>!\nIf you have any questions feel free to open a <#946438559106211850>`)
        client.channels.cache.find(channel => channel.id === '747728788275724290').send({
            content: `Welcome <@${member.id}>, to the server!`,
            embeds: [Embed]
        })
    } else {
        return;
    }
})