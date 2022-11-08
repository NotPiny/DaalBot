const daalbot = require('../../daalbot.js');
const Discord = require('discord.js');
const config = require('../../config.json');
const fs = require('fs');
const path = require('path');
const embedColours = [
    'Red',
    'Orange',
    'Yellow',
    'Green',
    'Blue',
    'Purple',
    'Luminous_Vivid_Pink',
    'Dark_But_Not_Black',
    'White',
    'Grey',
    'Aqua',
]

module.exports = {
    name: 'ticket',
    description: 'You should not be able to see the description of this command.',
    category: 'Guild',

    slash: true,
    testOnly: false,

    requireRoles: true,

    options: [
        {
            name: 'send',
            description: 'Send a ticket panel to a channel.',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'channel',
                    description: 'The channel to send the ticket panel to.',
                    type: 'CHANNEL',
                    required: true
                },
                {
                    name: 'title',
                    description: 'The title of the ticket panel.',
                    type: 'STRING',
                    required: true
                },
                {
                    name: 'colour',
                    description: 'The colour of the ticket panel.',
                    type: 'STRING',
                    required: true,
                    choices: embedColours.map((colour) => ({
                        name: colour,
                        value: colour.toUpperCase(),
                    })),
                }
            ]
        },
        {
            name: 'close',
            description: 'Close a ticket.',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'ticket',
                    description: 'The ticket to close.',
                    type: 'CHANNEL',
                    required: false
                }
            ]
        },
        {
            name: 'category',
            description: 'Set the category for tickets.',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'category',
                    description: 'The category to set.',
                    type: 'CHANNEL',
                    required: true
                }
            ]
        },
        {
            name: 'permissions',
            description: 'Modifies the permissions for the ticket channels.',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'role',
                    description: 'The role to modify the permissions for.',
                    type: 'ROLE',
                    required: true
                },
                {
                    name: 'allow',
                    description: 'Whether to allow or deny the role to see the tickets.',
                    type: 'BOOLEAN',
                }
            ]
        }
    ],

    callback: ({ interaction }) => {
        const subCommand = interaction.options.getSubcommand();

        if (subCommand === 'send') {
            const channel = interaction.options.getChannel('channel');
            const title = interaction.options.getString('title');
            const colour = interaction.options.getString('colour');

            const embed = new Discord.MessageEmbed()
                .setTitle(title)
                .setDescription('Click the button below to create a ticket.')
                .setColor(colour);

            const row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageButton()
                        .setCustomId('create_ticket')
                        .setLabel('Create Ticket')
                        .setStyle('SUCCESS')
                );

            channel.send({ embeds: [embed], components: [row] });

            return 'Ticket panel sent.';
        }

        if (subCommand === 'category') {
            const category = interaction.options.getChannel('category');

            if (category.type !== 'GUILD_CATEGORY') {
                return 'That is not a category.';
            }

            const guild = interaction.guild;

            try {
            if (fs.existsSync(`${config.botPath}/db/tickets/${guild.id}.category`)) {
                fs.writeFileSync(`${config.botPath}/db/tickets/${guild.id}.category`, category.id);
            } else {
                fs.appendFileSync(`${config.botPath}/db/tickets/${guild.id}.category`, category.id);
            }
        } catch (err) {
            console.log('Error writing to file: ' + err);
        }

            return 'Successfully set the category for tickets.';
        }

        if (subCommand === 'close') {
            let ticket = interaction.options.getChannel('ticket');

            if (ticket == null) {
                ticket = interaction.channel;
            }

            if (!ticket.name.startsWith('ticket-')) return 'That is not a ticket.';

            if (fs.existsSync(path.resolve(`./db/tickets/${interaction.guild.id}/${ticket.name.replace('ticket-', '')}.ticket`))) {
                fs.unlinkSync(path.resolve(`./db/tickets/${interaction.guild.id}/${ticket.name.replace('ticket-', '')}.ticket`));
                ticket.delete();
                return 'Successfully closed the ticket.';
            } else {
                return 'We could not find that ticket in the database.';
            }
        }

        if (subCommand === 'permissions') {
            const role = interaction.options.getRole('role');
            const allow = interaction.options.getBoolean('allow');

            const guild = interaction.guild;
            const guildId = guild.id;

            const folder = path.resolve(`./db/tickets/`);

            if (fs.existsSync(`${folder}/${guildId}.permissions`)) {
                const permissions = fs.readFileSync(`${folder}/${guildId}.permissions`, 'utf8').split('\n');
                let newPerms = [];
                let found = false;

                for (let i = 0; i < permissions.length; i++) {
                    const data = permissions[i].split(':');

                    if (data[0] === role.id) {
                        found = true;
                        if (allow) {
                            newPerms.push(`${role.id}:allow`);
                        } else {
                            newPerms.push(`${role.id}:deny`);
                        }
                    } else {
                        newPerms.push(permissions[i]);
                    }

                    if (i === permissions.length - 1 && !found) {
                        if (allow) {
                            newPerms.push(`${role.id}:allow`);
                        } else {
                            newPerms.push(`${role.id}:deny`);
                        }
                    }
                }

                // Reset the file
                fs.writeFileSync(`${folder}/${guildId}.permissions`, '');

                newPerms.forEach(perm => {
                    if (perm == '') return;
                    fs.appendFileSync(`${folder}/${guildId}.permissions`, `${perm}\n`);
                })
                return 'Successfully updated the permissions.';
            } else {
                fs.appendFileSync(`${folder}/${guildId}.permissions`, `${role.id}:allow`);
                return 'Successfully updated the permissions.';
            }
        }
    }
}