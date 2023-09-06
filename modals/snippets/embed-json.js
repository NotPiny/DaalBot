const DJS = require('discord.js');
const daalbot = require('../../daalbot.js');

/**
 * 
 * @param {DJS.Interaction} interaction 
 */
module.exports = async(interaction) => {
    if (!interaction.isModalSubmit()) return;

    try {
        const json = JSON.parse(interaction.fields.getTextInputValue('json-input'))
        const channel = daalbot.getChannel(interaction.guild.id, interaction.fields.getTextInputValue('channel-id'))

        const embed = new DJS.EmbedBuilder(json);

        channel.send({ embeds: [embed] });

        interaction.reply({ content: 'Sent embed', embeds: [embed], ephemeral: true });
    } catch {
        const errorEmbed = new DJS.EmbedBuilder()
            .setTitle('Error')
            .setDescription('Something went wrong please try again and make sure the JSON is valid.')
            .setColor('Red')
            .setTimestamp();

        interaction.reply({
            content: 'Oops we messed up',
            embeds: [errorEmbed],
            ephemeral: true
        })
    }
}