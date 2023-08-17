const daalbot = require('../../daalbot.js');
const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'xp-reward',
    description: 'Sets up a reward for levels.',
    category: 'XP',

    slash: true,

    testOnly: true,

    options: [
        {
            name: 'level',
            description: 'The level to grant the reward apon reaching.',
            type: 'INTEGER',
            required: true
        },
        {
            name: 'role',
            description: 'The role to grant apon reaching the level.',
            type: 'ROLE',
            required: true
        }
    ],

    callback: ({ interaction }) => {
        // Get the level and role from the interaction.
        const level = parseInt(`${interaction.options.getInteger('level')}`) // Would probably be easier to just use typescript but typescript is a pain.
        const roleID = interaction.options.getRole('role').id;

        // Convert the roleID to a role object.
        const role = daalbot.getRole(interaction.guild.id, roleID);

        // Functions
        function generateErrorEmbed(error) {
            const embed = new EmbedBuilder()
                .setColor('#EF3D48')
                .setTitle('Error')
                .setDescription(error)
                .setTimestamp();

            return embed;
        }

        // Check if the role exists.
        if (role === 'Role not found.') {
            const embed = generateErrorEmbed('The bot could not find the role you specified.')

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (role === 'Server not found.') {
            const embed = generateErrorEmbed('The bot could not find the server that you are in.')

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (role == undefined) {
            const embed = generateErrorEmbed('The role just returned undefined and has no explanation as to why.')

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        // Check if the level is a positive number and not 0.
        if (!(level > 1)) {
            const embed = generateErrorEmbed('The level you specified is not a valid number.')

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        // Write the reward to the file.
        const filepath = path.resolve(`./db/xp/${interaction.guild.id}/rewards/${level}.reward`);
        const fileDir = path.resolve(`./db/xp/${interaction.guild.id}/rewards/`);

        // Check if the directory exists.
        if (!fs.existsSync(fileDir)) {
            fs.mkdirSync(fileDir);
        }

        // Write the file (or overwrite it if it already exists)
        daalbot.fs.write(filepath, roleID);

        // Send the success embed.
        const embed = new EmbedBuilder()
            .setColor('#57F28D')
            .setTitle('Success')
            .setDescription(`The role <@&${role.id}> will be granted to users when they reach level ${level}.`)
            .setTimestamp();

        return interaction.reply({ embeds: [embed], ephemeral: true });
    }
}