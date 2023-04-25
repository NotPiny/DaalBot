const fs = require('fs');
const path = require('path');
const { MessageEmbed } = require('discord.js');
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
                const embed = new MessageEmbed()
                    .setTitle('Privacy Policy')
                    .setDescription(`**What we store**\nBy default, DaalBot does not store any data. If someone with the correct permissions were to run a command like /logs the data entered into that command will be stored in the bots database in order for the bot to do its function in this case logging events in the server. No other data relating to the server is stored except for events like the bot being added / removed from the server which will send a log to a private channel and contains the server name and ID. DaalBot does not store any data about the users in the server except for when needed like when giving certain permissions to users but this data is never sent to logs of any kind.\n\n**Questions and removal**\nIf you have any questions about the privacy policy please or want your data removed please message or mention <@900126154881646634>`)

                interaction.reply({ embeds: [embed], ephemeral: true });
            }
        }
    }
}