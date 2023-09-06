const daalbot = require('../../daalbot.js');
const DJS = require('discord.js');

/**
 * @param {DJS.Interaction} interaction 
 */
module.exports = async(interaction) => {
    if (!interaction.isModalSubmit()) return;

    const json = JSON.parse(interaction.fields.getTextInputValue('json-input'))
    const channel = daalbot.getChannel(interaction.guild.id, interaction.fields.getTextInputValue('channel-id'))

    if (channel == undefined) return interaction.reply({ content: 'Channel not found', ephemeral: true });
    if (channel == 'Channel not found.') return interaction.reply({ content: 'Channel not found', ephemeral: true });
    if (channel == 'Server not found.') return interaction.reply({ content: 'Channel not found', ephemeral: true });

    /**
     * @type {DJS.Message}
     */
    const message = await channel.send(json);

    const messageLink = `https://discord.com/channels/${interaction.guild.id}/${channel.id}/${message.id}`;

    interaction.reply({
        content: `Sent message to <#${channel.id}> (${messageLink})`,
        ephemeral: true
    })
}