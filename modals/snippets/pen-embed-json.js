const DJS = require('discord.js');
const daalbot = require('../../daalbot.js');

/**
 * 
 * @param {DJS.Interaction} interaction 
 */
module.exports = (interaction) => {
    if (!interaction.isModalSubmit()) return;

    const json = JSON.parse(interaction.fields.getTextInputValue('json-input'))
    const channel = daalbot.getChannel(interaction.guild.id, interaction.fields.getTextInputValue('channel-id'))

    const embed = new DJS.EmbedBuilder(json);

    channel.send({ embeds: [embed] });

    interaction.reply({ content: 'Sent embed', embeds: [embed], ephemeral: true });
}