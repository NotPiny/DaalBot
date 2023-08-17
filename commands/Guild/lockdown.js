const DJS = require('discord.js');
const fs = require('fs');
const path = require('path');
const daalbot = require('../../daalbot.js');

module.exports = {
    name: 'lockdown',
    description: 'Locksdown the server',
    category: 'Guild',

    slash: true,
    testOnly: true,

    options: [
        {
            name: 'start',
            description: 'Starts the lockdown',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'reason',
                    description: 'The reason for the lockdown',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'role',
                    description: 'The role to remove send perms from',
                    type: 'ROLE',
                    required: true
                }
            ]
        },
        {
            name: 'end',
            description: 'Ends the lockdown',
            type: 'SUB_COMMAND'
        }
    ],

    
    callback: async ({ interaction }) => {
        const subCommand = interaction.options.getSubcommand();

        const guild = daalbot.fetchServer(interaction.guild.id);
        if (guild === 'Server not found.' || guild === undefined) return await interaction.reply({ content: 'Server not found.', ephemeral: true });

        if (subCommand === 'start') {
            if (fs.existsSync(path.resolve(`./db/lockdown/${interaction.guild.id}/lockdown.json`))) {
                return await interaction.reply({ content: 'The server is already in lockdown', ephemeral: true });
            }

            let data = {
                channels: [],
                role: '',
                reason: ''
            }

            const Reason = interaction.options.getString('reason');
            const role = interaction.options.getRole('role');

            const roleId = `${role.id}`; // Turning the string into a string because it's a string and typeless javascript is stupid
            const reason = `${Reason}`; // Again typeless javascript is stupid

            data.role = roleId;
            data.reason = reason;

            const embed = new DJS.EmbedBuilder()
                .setTitle('Lockdown started')
                .setDescription(`The server has been locked down by ${interaction.user.tag} for the reason: ${reason}`)
                .setColor('#EF3D48')
                .setTimestamp();

            await daalbot.logEvent(interaction.guild.id, 'lockdownstarted', embed); // Bugged

            const channels = guild.channels.cache.filter(c => c.type === 'GUILD_TEXT' && c.permissionsFor(roleId).has('SEND_MESSAGES'));

            channels.forEach(channel => {
                channel.permissionOverwrites.edit(roleId, { SEND_MESSAGES: false }); // Potental bug here
                data.channels.push(channel.id);
            })

            if (!fs.existsSync(path.resolve(`./db/lockdown/${interaction.guild.id}/`))) fs.mkdirSync(path.resolve(`./db/lockdown/${interaction.guild.id}/`));
            daalbot.fs.write(`./db/lockdown/${interaction.guild.id}/lockdown.json`, JSON.stringify(data, null, 4));

            await interaction.reply({ content: 'The server has been locked down', ephemeral: true });
        } else if (subCommand === 'end') {
            if (!fs.existsSync(path.resolve(`./db/lockdown/${interaction.guild.id}/lockdown.json`))) {
                return await interaction.reply({ content: 'The server is not in lockdown', ephemeral: true });
            }

            const data = JSON.parse(fs.readFileSync(path.resolve(`./db/lockdown/${interaction.guild.id}/lockdown.json`)));

            const role = interaction.guild.roles.cache.get(data.role);

            const embed = new DJS.EmbedBuilder()
                .setTitle('Lockdown ended')
                .setDescription(`The server has been unlocked by ${interaction.user.tag}`)
                .setColor('#57F28D')
                .setTimestamp();

            daalbot.logEvent(interaction.guild.id, 'lockdownstarted', embed);

            data.channels.forEach(channel => {
                interaction.guild.channels.cache.get(channel).permissionOverwrites.edit(role, { SEND_MESSAGES: true });
            })

            fs.rmSync(path.resolve(`./db/lockdown/${interaction.guild.id}/lockdown.json`));

            await interaction.reply({ content: 'The server has been unlocked', ephemeral: true });
        }
    }
}