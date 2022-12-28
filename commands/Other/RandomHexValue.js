const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'randomhexvalue',
    description: 'Generates a random hex value',
    category: 'Testing',

    slash: true,

    callback: () => {
        const hex = Math.floor(Math.random() * 16777215).toString(16);
        const Embed = new MessageEmbed()
            .setTitle(hex)
            .setColor(hex);
        return {
            custom: true,
            embeds: [Embed],
        }
    }
}