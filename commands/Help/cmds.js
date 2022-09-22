const fs = require('fs');
// let Games = fs.readdirSync(`../Games/`);
// let Help = fs.readdirSync(`./`);
// let Message = fs.readdirSync('../Message/');
// let Moderation = fs.readdirSync('../Moderation/');
// let Other = fs.readdirSync('../Other/');
// let Roleplay = fs.readdirSync('../Roleplay/');
// let Utility = fs.readdirSync('../Utility/');
// const { MessageEmbed } = require('discord.js');
module.exports = {
    description: 'Brings up a list of commands',
    category: 'Help',

    testOnly: true,
    slash: true,

    options: [
        {
            name: 'command',
            description: 'The command to lookup',
            type: 'STRING',
            required: false,
        }
    ],

    callback: (interaction) => {
        const Embed = new MessageEmbed()
        .setTitle('Commands')
        .setDescription('****')
        const command = interaction.options.getString('command');

        if (command == null) {
            return `Games: \n\`\`\`\n${Games}\n\`\`\``
        }
    }
}