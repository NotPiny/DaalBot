const daalbot = require('../../daalbot.js');

module.exports = {
    category: 'Utility',
    description: 'Utility stuff',

    slash: 'both',
    ownerOnly: false,
    testOnly: false,

    options: [
        {
            name: 'id',
            description: 'Get the ID of a thing',
            type: 'SUB_COMMAND_GROUP',
            options: [
                {
                    name: 'role',
                    description: 'Get the ID of a role',
                    type: 'SUB_COMMAND',
                    options: [
                        {
                            name: 'role',
                            description: 'The role to get the ID of',
                            type: 'ROLE',
                            required: true,
                        }
                    ]
                }
            ]
        },
        {
            name: 'replace',
            description: 'Replace stuff',
            type: 'SUB_COMMAND_GROUP',
            options: [
                {
                    name: 'newline',
                    description: 'Replace newline for <nl>',
                    type: 'SUB_COMMAND'
                }
            ]
        }
    ],

    callback: ({ interaction, message }) => {
        const subCommandGroup = `${interaction.options.getSubcommandGroup()}`
        const subCommand = `${interaction.options.getSubcommand()}`

        if (subCommandGroup === 'id') {
            if (subCommand === 'role') {
                const role = interaction.options.getRole('role')
                return `The ID of the role is ${role.id}`
            }
        }

        if (subCommandGroup === 'replace') {
            if (subCommand === 'newline') {
                return 'Visit https://daalbot.xyz/Tools/Commands/Util/Replace/Newline'
            }
        }
    }
}