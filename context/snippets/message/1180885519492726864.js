// Get message info
const { EmbedBuilder, MessageContextMenuCommandInteraction } = require('discord.js');

async function createPaste(content) {
    // TODO: Add paste logic
    return `https://daalbot.xyz/hooks/paste?pid=test&ex=${Date.now() + 2 * 7 * 24 * 60 * 60 * 1000}`;
}

/**
 * @param {MessageContextMenuCommandInteraction} interaction
*/
module.exports = async (interaction) => {
    const message = interaction.targetMessage;

    const embed = new EmbedBuilder()
        .setTitle('Message Info')
        .addFields([
            {
                name: `Author`,
                value: `${message.author.username} (${message.author.id})`,
                inline: true
            },
            {
                name: `Channel`,
                value: `${message.channel.name} (${message.channel.id})`,
                inline: true
            },
            {
                name: `ID`,
                value: `${message.id}`,
                inline: false
            },
            {
                name: `Raw`,
                value: `[Click Here](${await createPaste()})`,
            }
        ])

    await interaction.reply({
        content: `${JSON.stringify(message, null, 4)}`,
        embeds: [embed]
    });
}