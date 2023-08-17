const daalbot = require('../../daalbot');
const DJS = require('discord.js');

module.exports = {
    name: 'penalert',
    description: 'Send a alert in every server with bot alerts configured',
    category: 'Pen',

    slash: true,
    testOnly: true,
    ownerOnly: true,

    callback: async ({ interaction }) => {
        const client = daalbot.client;
        const channel = daalbot.getChannel(interaction.guild.id, interaction.channel.id);

        if (channel === 'Channel not found.') return;
        if (channel === 'Server not found.') return;
        if (channel === undefined) return;

        const filter = (m) => m.author.id === interaction.user.id;
        try {
            await interaction.reply(`Send a embed json :)`)

            const collected = await channel.awaitMessages({ filter, time: 60 * 1000, max: 1, errors: ['time'] });
            const embedJSON = collected.first().content.replace(/<SPACE>/g, ' ');

            const embedObject = JSON.parse(embedJSON);

            const embed = new DJS.EmbedBuilder(embedObject);
            embed.setTimestamp();

            client.guilds.cache.forEach(guild => {
                daalbot.guilds.sendAlert(guild.id, embed);
            })
        } catch (error) {
            interaction.editReply('You need to send a embed JSON to send the alert ya numpty.');
        }
    }
}