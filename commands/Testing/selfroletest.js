const DJS = require('discord.js');
const client = require('../../client.js');

module.exports = {
    name: 'selfroletest',
    category: 'Testing',
    description: 'Test self role command',

    requireRoles: true,

    slash: true,
    testOnly: true,
    guildOnly: true,

    options: [
        {
            name: 'channel',
            description: 'The channel that the message is in',
            type: 'CHANNEL',
            required: true
        },
        {
            name: 'message_id',
            description: 'The message to add to',
            type: 'STRING',
            required: true
        },
        {
            name: 'role',
            description: 'The role to add',
            type: 'ROLE',
            required: true
        },
        {
            name: 'place_holder',
            description: 'The placeholder text when no roles are selected',
            type: 'STRING',
            required: false
        }
    ],

    callback: async (interaction) => {
        // Get the options
        const channel = interaction.options.getChannel('channel');
        const message_id = interaction.options.getString('message_id');
        const role = interaction.options.getRole('role');
        const place_holder = interaction.options.getString('place_holder');

        const message = await channel.messages.fetch(message_id);

        // Create the option data
        const option = [
            {
                label: role.name,
                value: role.id,
            },
        ]

        // Create row instance
        let row = message.components[0]
        
        if (!row) {
            row = new DJS.MessageActionRow()
        }

        // Create the menu
        let menu = row.components[0]
        if (menu) {
            for (const o of menu.options) {
                if (o.value === option[0].value) {
                    return {
                        custom: true,
                        content: `<@&${o.value}> is already part of this menu.`,
                        ephemeral: true,
                        allowedMentions: {
                            roles: [],
                        },
                    }
                }
            }

            menu.addOptions(option)
            menu.setMaxValues(menu.options.length)
        } else {
            row.addComponents(
                new DJS.MessageSelectMenu()
                    .setCustomId('test_auto_roles')
                    .setMinValues(0)
                    .setMaxValues(1)
                    .setPlaceholder(place_holder == null ? 'Pick your roles!' : place_holder)
                    .addOptions(option)
            )
        }

        try {
            targetMessage.edit({
                components: [row],
            })
        } catch {
            console.log('bruh')
            return 'Something went wrong!'
        }

        return {
            custom: true,
            content: `Added <@&${role.id}> to the auto roles menu.`,
            allowedMentions: {
                roles: [],
            },
            ephemeral: true,
        }
    }

    // TODO: Register a callback for when a option is selected
}