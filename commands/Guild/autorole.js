const daalbot = require('../../daalbot.js');
const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'autorole',
    description: 'Sets the roles to add when a member joins for the server.',
    category: 'Guild',

    permissions: ['MANAGE_GUILD'],

    slash: true,
    testOnly: true,
    guildOnly: true,

    options: [
        {
            name: 'add',
            description: 'Adds a role to the autorole list.',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'role',
                    description: 'The role to add to the autorole list.',
                    type: 'ROLE',
                    required: true
                }
            ]
        },
        {
            name: 'remove',
            description: 'Removes a role from the autorole list.',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'role',
                    description: 'The role to remove from the autorole list.',
                    type: 'ROLE',
                    required: true
                }
            ]
        },
        {
            name: 'list',
            description: 'Lists the roles in the autorole list.',
            type: 'SUB_COMMAND'
        }
    ],

    callback: (interaction) => {
        const subcommand = interaction.options.getSubcommand();
        const role = interaction.options.getRole('role');
        const dbFolder = path.resolve(`./db/autorole/${interaction.guild.id}`)
        const roleID = role.id;

        if (subcommand === 'add') {
            // Add role to autorole list
            if (fs.existsSync(`${dbFolder}`)) {
                if (fs.existsSync(`${dbFolder}/${roleID}.id`)) {
                    return 'That role is already in the autorole list.';
                } else {
                    fs.appendFileSync(`${dbFolder}/${roleID}.id`, roleID);
                    return {
                        custom: true,
                        content: `Added <@&${roleID}> to the autorole list.`,
                        ephemeral: true,
                        allowedMentions: {
                            roles: []
                        }
                    }
                }
            } else {
                fs.mkdirSync(`${dbFolder}`);
                fs.appendFileSync(`${dbFolder}/${roleID}.id`, roleID);
                return {
                    custom: true,
                    content: `Added <@&${roleID}> to the autorole list.`,
                    ephemeral: true,
                    allowedMentions: {
                        roles: []
                    }
                }
            }
        }
    }
}