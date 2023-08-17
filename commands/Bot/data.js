const fs = require('fs');
const path = require('path');
const { EmbedBuilder } = require('discord.js');
const DJS = require('discord.js');
module.exports = {
    name: 'data',
    description: 'Modfies / Gets / Deletes data from the bot',
    category: 'Bot',

    slash: true,
    testOnly: false,

    options: [
        {
            name: 'info',
            description: 'Gets info about data from the bot',
            type: 'SUB_COMMAND_GROUP',
            options: [
                {
                    name: 'policy',
                    description: 'Gets info about the privacy policy',
                    type: 'SUB_COMMAND',
                }
            ]
        }
    ],

    callback: ({interaction}) => {
        const subCommandGroup = interaction.options.getSubcommandGroup();
        const subCommand = interaction.options.getSubcommand();

        if (subCommandGroup === 'info') {
            if (subCommand === 'policy') {
                const embed = new EmbedBuilder()
                    .setDescription(fs.readFileSync(path.resolve(`./PRIVACY.md`), 'utf8').replace('<br/>', '\n'));

                interaction.reply({ embeds: [embed], ephemeral: true });
            }
        }
    }
}