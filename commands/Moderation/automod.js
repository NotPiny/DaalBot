const { botPath } = require('../../config.json');
const fs = require('fs');
module.exports = {
    name: 'automod',
    description: 'Configures automod settings for DaalBot',
    category: 'Moderation',

    slash: true,
    testOnly: true, //guild testing
    guildOnly: true, //guild only command

    permissions: ['ADMINISTRATOR'],

    options: [
        {
            name: 'modify',
            description: 'Modify the automod settings',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'rule',
                    description: 'The rule to configure',
                    type: 'STRING',
                    required: true,
                    choices: [
                        {
                            name: 'invites',
                            value: 'invitelinks'
                        },
                        {
                            name: 'profanity',
                            value: 'profanity'
                        },
                        {
                            name: 'caps',
                            value: 'caps'
                        },
                        {
                            name: 'links',
                            value: 'links'
                        }
                    ]
                },
                {
                    name: 'action',
                    description: 'The action to take when the rule is broken',
                    type: 'STRING',
                    required: true,
                    choices: [
                        {
                            name: 'None',
                            value: 'none'
                        },
                        {
                            name: 'Delete',
                            value: 'delete'
                        },
                        {
                            name: 'Warn',
                            value: 'warn'
                        },
                        {
                            name: 'Mute',
                            value: 'mute'
                        },
                        {
                            name: 'Kick',
                            value: 'kick'
                        },
                        {
                            name: 'Ban',
                            value: 'ban'
                        }
                    ]
                }
            ],
        },
        {
            name: 'settings',
            description: 'modify the automod settings',
            type: 'SUB_COMMAND_GROUP',
            options: [
                {
                    name: 'exeptions',
                    description: 'Modify the automod exeptions',
                    type: 'SUB_COMMAND',
                    options: [
                        {
                            name: 'action',
                            description: 'The modifcation to make',
                            type: 'STRING',
                            required: true,
                            choices: [
                                {
                                    name: 'Add',
                                    value: 'add'
                                },
                                {
                                    name: 'Remove',
                                    value: 'remove'
                                }
                            ]
                        },
                        {
                            name: 'role',
                            description: 'The role to modify in the exeptions list',
                            type: 'ROLE',
                            required: true
                        },
                        {
                            name: 'rule',
                            description: 'The rule to modify the exeption to',
                            type: 'STRING',
                            required: true,
                            choices: [
                                {
                                    name: 'invites',
                                    value: 'invitelinks'
                                },
                                {
                                    name: 'profanity',
                                    value: 'profanity'
                                },
                                {
                                    name: 'caps',
                                    value: 'caps'
                                },
                                {
                                    name: 'links',
                                    value: 'links'
                                },
                            ]
                        }
                    ]
                }
            ],
        },
    ],
        
    
    callback: ({ client, message, interaction, args }) => {
        const subCommand = interaction.options.getSubcommand();

        if (subCommand === 'roles') {
            const mutedRole = interaction.options.getRole('muted');
            if (fs.existsSync(`${botPath}/db/automod/${interaction.guild.id}-mute.role`)) {
                fs.writeFileSync(`${botPath}/db/automod/${interaction.guild.id}-mute.role`, mutedRole.id);
            } else {
                fs.appendFileSync(`${botPath}/db/automod/${interaction.guild.id}-mute.role`, mutedRole.id)
            }
            return `Muted role set to ${mutedRole.name}`;
        }

        if (subCommand === 'modify') {
            const rule = interaction.options.getString('rule');
            const action = interaction.options.getString('action');

            if (fs.existsSync(`${botPath}/db/automod/${interaction.guild.id}-${rule}.action`)) {
                fs.writeFileSync(`${botPath}/db/automod/${interaction.guild.id}-${rule}.action`, action);
            } else {
                fs.appendFileSync(`${botPath}/db/automod/${interaction.guild.id}-${rule}.action`, action);
            }
            return {
                custom: true,
                content: `Automod rule ${rule} set to ${action}`,
                allowedMentions: {
                    users: [],
                },
                ephemeral: true,
            }
        }

        if (subCommand === 'exeptions') {
            const action = interaction.options.getString('action');
            const role = interaction.options.getRole('role');
            const rule = interaction.options.getString('rule');

            if (action === 'add') {
                if (fs.existsSync(`${botPath}/db/automod/${interaction.guild.id}-${rule}-exeptions.list`)) {
                    fs.appendFileSync(`${botPath}/db/automod/${interaction.guild.id}-${rule}-exeptions.list`, `\n${role.id}`);
                } else {
                    fs.appendFileSync(`${botPath}/db/automod/${interaction.guild.id}-${rule}-exeptions.list`, role.id);
                }
            } else if (action === 'remove') {
                if (fs.existsSync(`${botPath}/db/automod/${interaction.guild.id}-${rule}-exeptions.list`)) {
                    let exeptions = fs.readFileSync(`${botPath}/db/automod/${interaction.guild.id}-${rule}-exeptions.list`, 'utf8');
                    exeptions = exeptions.split('\n');
                    exeptions = exeptions.filter(exeption => exeption !== role.id);
                    fs.writeFileSync(`${botPath}/db/automod/${interaction.guild.id}-${rule}-exeptions.list`, exeptions.join('\n'));
                }
            }

            return `Automod rule \`${rule}\` exeptions have been updated`;
        }
    }
}