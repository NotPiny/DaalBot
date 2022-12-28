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
    description: 'Manages tickets for the server.',
    category: 'Guild',

    slash: true,
    testOnly: false,
    guidlOnly: true,

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
                },
                {
                    name: 'transcript',
                    description: 'Whether or not to send the transcript of the ticket.',
                    type: 'BOOLEAN',
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
            let transcript = interaction.options.getBoolean('transcript');

            if (ticket == null) {
                ticket = interaction.channel;
            }

            if (transcript == null) {
                transcript = false;
            }

            if (!ticket.name.startsWith('ticket-') && !ticket.name.startsWith('closed-')) return 'That is not a ticket.';

            if (fs.existsSync(path.resolve(`./db/tickets/${interaction.guild.id}/${ticket.name.replace('ticket-', '')}.ticket`))) {
                fs.unlinkSync(path.resolve(`./db/tickets/${interaction.guild.id}/${ticket.name.replace('ticket-', '')}.ticket`));
                ticket.delete();

                // Log the ticket closing if enabled.
                if (fs.existsSync(path.resolve(`./db/logging/${interaction.guild.id}/TICKETCLOSE.enabled`))) {
                    if (!fs.existsSync(path.resolve(`./db/logging/${interaction.guild.id}/channel.id`))) return 'We were unable to find a log channel to send the close message to.';
                    const logChannel = daalbot.getChannel(interaction.guild.id, fs.readFileSync(path.resolve(`./db/logging/${interaction.guild.id}/channel.id`), 'utf8'));

                    const embed = new Discord.MessageEmbed()
                        .setTitle('Ticket Closed')
                        .setDescription(`Ticket ${ticket.name.replace('ticket-', '')} was closed by ${interaction.user.tag}.`)
                        .setColor('RED')
                        .setTimestamp();

                    logChannel.send({ content: 'Ticket Closed.', embeds: [embed] });
                }

                // Sends transcript if enabled
                if (transcript) {
                    // Basic fs.existsSync checks to make sure the transcript can be sent.
                    if (fs.existsSync(path.resolve(`./db/tickets/${interaction.guild.id}/${ticket.name.replace('ticket-', '')}.txt`))) {
                        if (!fs.existsSync(path.resolve(`./db/logging/${interaction.guild.id}/channel.id`))) return 'We were unable to find a log channel to send the transcript to.';
                        if (!fs.existsSync(path.resolve(`./db/tickets/${interaction.guild.id}/${ticket.name.replace('ticket-', '')}.txt`))) return 'We were unable to find a transcript to send.';

                        // Fetches the log channel and sends the transcript.
                        const logChannelID = fs.readFileSync(path.resolve(`./db/logging/${interaction.guild.id}/channel.id`), 'utf8');

                        const logChannel = daalbot.getChannel(interaction.guild.id, logChannelID);

                        logChannel.send({
                            content: `Transcript for ticket #${ticket.name.replace('ticket-', '')}`,
                            files: [path.resolve(`./db/tickets/${interaction.guild.id}/${ticket.name.replace('ticket-', '')}.txt`)]
                        });

                        // Tells the user that the transcript was sent.
                        interaction.reply({
                            content: `Ticket closed. Transcript sent to <#${logChannelID}>`,
                            ephemeral: true
                        })

                        // Deletes the transcript but with a delay to make sure the file still exists when it gets sent to the log channel.
                        setTimeout(() => {
                            fs.unlinkSync(path.resolve(`./db/tickets/${interaction.guild.id}/${ticket.name.replace('ticket-', '')}.txt`));
                        }, 2500);
                    }
                } else {
                    interaction.reply({
                        content: 'Ticket closed.',
                        ephemeral: true
                    });

                    if (!fs.existsSync(path.resolve(`./db/tickets/${interaction.guild.id}/${ticket.name.replace('ticket-', '')}.txt`))) {
                        console.log('No transcript found.');
                    } else {
                        fs.unlinkSync(path.resolve(`./db/tickets/${interaction.guild.id}/${ticket.name.replace('ticket-', '')}.txt`));
                    }
                }
            } else {
                return 'We could not find that ticket in the database.';
            }
        }

        if (subCommand === 'permissions') {
            // return 'Disabled for now.';
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
                        if (permissions[i] == '') continue;
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