const DJS = require('discord.js');
const daalbot = require('../../daalbot.js');
const client = require('../../client.js');

/**
 * @param {DJS.ButtonInteraction<DJS.CacheType>} interaction 
*/
module.exports = async (interaction) => {
    const embed = new DJS.EmbedBuilder()
        .setColor(daalbot.colours.daalbot_purple)
        .setTitle('Activate server')
        .setDescription('Please pick a server to activate.');

    const guilds = client.guilds.cache.filter(guild =>  guild.ownerId === interaction.user.id && !daalbot.premium.isServerActivated(guild.id));

    if (guilds.size === 0) {
        embed.setDescription('You do not own any servers.');
        interaction.reply({ embeds: [embed], ephemeral: true });
        return;
    }

    const row = new DJS.ActionRowBuilder()
        .addComponents(
            new DJS.StringSelectMenuBuilder()
                .setCustomId('handler_premium_activate')
                .setPlaceholder('Select a server')
                .addOptions(guilds.map(guild => {
                    return {
                        label: guild.name,
                        value: guild.id
                    }
                }))
        );

    interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
}