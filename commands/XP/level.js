const config = require('../../config.json');
const botPath = config.botPath;
const fs = require('fs');
// const canvas = require('canvas');
const Discord = require('discord.js');
module.exports = {
    name: 'level',
    description: 'Shows your or another members level',
    slash: true,
    testOnly: false,
    ownerOnly: false,
    guildOnly: true,
    category: 'XP',
    options: [
        {
            name: 'user',
            description: 'The user to show the level of',
            type: 'USER',
            required: false
        }
    ],

    callback: ({ interaction }) => {
        let user = interaction.user;
        if (interaction.options.getUser('user') !== null) {
            user = interaction.options.getUser('user');
        }

            if (user.bot) return interaction.reply({ content: `<@${user.id}> is a bot and does not have a level`, ephemeral: true });

            if (fs.existsSync(`${botPath}/db/xp/${interaction.guild.id}/${user.id}.xp`)) {
                let xp = fs.readFileSync(`${botPath}/db/xp/${interaction.guild.id}/${user.id}.xp`, 'utf8');
                let level = xp.slice(0, -3) || 0;
                interaction.reply({ content: `${user.username} is level ${level} with ${xp.slice(level.length)} xp\nXP till level up: ${1000 - (xp.slice(level.length))}`, ephemeral: true });
            } else {
                interaction.reply({ content: `We were unable to find a entry for ${user.tag}`, ephemeral: true });
            }
    }
}