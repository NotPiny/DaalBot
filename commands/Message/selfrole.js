const DJS = require('discord.js');
const daalbot = require('../../daalbot.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'selfrole',
    description: 'Add a role to the selfrole menu',
    category: 'Message',

    type: 'SLASH',
    // testOnly: true,

    guildOnly: true,
    permissions: [
        DJS.PermissionFlagsBits.ManageRoles,
    ],

    options: [
        {
            name: 'role',
            description: 'The role to add to the dropdown',
            type: DJS.ApplicationCommandOptionType.Role,
            required: true,
        },
        {
            name: 'channel',
            description: 'The channel to send the dropdown to',
            type: DJS.ApplicationCommandOptionType.Channel,
            required: true,
        },
        {
            name: 'message_id',
            description: 'The message id / link to add the menu to',
            type: DJS.ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'placeholder',
            description: 'The placeholder text for the dropdown',
            type: DJS.ApplicationCommandOptionType.String,
            required: false,
        }
    ],

    callback: async ({ interaction }) => {
        const role = interaction.options.getRole('role');

        /**
         * @type {DJS.TextChannel}
         */
        const channel = daalbot.getChannel(interaction.guild.id, interaction.options.getChannel('channel').id)
        const message_input = interaction.options.getString('message_id');
        const placeholder = interaction.options.getString('placeholder') || 'Select a role';

        if (channel == undefined) return interaction.reply({ content: 'Channel not found', ephemeral: true });
        if (channel == 'Channel not found.') return interaction.reply({ content: 'Channel not found', ephemeral: true });
        if (channel == 'Server not found.') return interaction.reply({ content: 'Server not found', ephemeral: true });

        const message = await daalbot.getMessageFromString(message_input, channel);

        if (message.id == undefined) return interaction.reply({ content: 'Message not found', ephemeral: true });

        if (message.components.length > 0) {
            const row = message.components[0];

            if (row.components[0].type == DJS.ComponentType.StringSelect) {
                row.components[0].options.push({
                    label: role.name,
                    value: role.id,
                });

                await message.edit({ components: [row] });
                return interaction.reply({ content: 'Role added to dropdown', ephemeral: true });
            } else {
                return interaction.reply({ content: 'Unsupported message', ephemeral: true });
            }
        } else {
            const row = new DJS.ActionRowBuilder()

            const dropdown = new DJS.StringSelectMenuBuilder()
                .setCustomId('auto_roles')
                .setPlaceholder(placeholder)
                .addOptions([
                    {
                        label: role.name,
                        value: role.id,
                    }
                ])

            row.addComponents(dropdown);

            await message.edit({ components: [row] });

            return interaction.reply({ content: 'Role added to dropdown', ephemeral: true });
        }
    }
}