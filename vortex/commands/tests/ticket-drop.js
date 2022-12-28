const client = require('../../../client.js');
const daalbot = require('../../../daalbot.js');
const Discord = require('discord.js');

client.on('messageCreate', msg => {
    if (msg.author.id == '900126154881646634') {
        if (msg.content == '$ticket-drop') {
            const row = new Discord.MessageActionRow()
                .addComponents(
                    new Discord.MessageSelectMenu()
                        .setCustomId('vortex-ticket-dropdown')
                        .setPlaceholder('Select a reason for your ticket')
                        .addOptions([
                            {
                                label: 'Infraction issue',
                                description: 'Open a ticket for an infraction issue',
                                value: 'Infraction issue'
                            },
                            {
                                label: 'Role issue',
                                description: 'Open a ticket for a role issue',
                                value: 'Role issue'
                            },
                            {
                                label: 'Member issue',
                                description: 'Open a ticket for a member issue',
                                value: 'Member issue'
                            },
                            {
                                label: 'Server issue',
                                description: 'Open a ticket for a server issue',
                                value: 'Server issue'
                            },
                            {
                                label: 'Map service request',
                                description: 'Open a ticket for a map service request',
                                value: 'Map service request'
                            },
                            {
                                label: 'Other',
                                description: 'Open a ticket for something else',
                                value: 'Other'
                            }
                        ])
                        .setMinValues(1)
                        .setMaxValues(1)
                )

                const embed = new Discord.MessageEmbed()
                    .setTitle('Service Request')
                    .setDescription(`
                    > Click The Button Below To Be Added To The Queue For A Service Member!
                    > Here Are Some Possible Problems We Will Look For In Your Ticket.
                    > React To This 📩 To Get Your Ticket
                    `)
                    .setColor('AQUA')
                    .setFooter({
                        text: 'Vortex | Service Request',
                        iconURL: 'https://pinymedia.web.app/VortexIcon.png'
                    })

                msg.channel.send({
                    embeds: [embed],
                    components: [row]
                })
        }
    }
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isSelectMenu()) return;

    if (interaction.customId === 'vortex-ticket-dropdown') {
        const ticketChannel = await interaction.guild.channels.create(`ticket-${interaction.user.username}#${interaction.user.discriminator}`, {
            type: 'GUILD_TEXT',
            permissionOverwrites: [
                {
                    id: interaction.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL']
                },
                {
                    id: interaction.user.id,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                }
            ],
            parent: daalbot.getChannel(interaction.guild.id, '974284633086771240')
        })

        interaction.reply({
            content: 'Your ticket has been created!',
            ephemeral: true
        })

        const supportRole = daalbot.getRole(interaction.guild.id, '974534922125594626')
        
        if (supportRole == 'Role not found.' || supportRole == 'Server not found.' || supportRole == undefined) {
            return interaction.editReply({
                content: 'Error: \`\`\`\nDaalbot was unable to find the support role.\n\`\`\`',
                ephemeral: true
            })
        }

        await ticketChannel.permissionOverwrites.edit(supportRole, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true
        })

        const embed = new Discord.MessageEmbed()
            .setTitle(`Ticket - ${interaction.values[0]}`)
            .setDescription(`
            Welcome To Your Ticket, ${interaction.user.username}!
            Someone will be with you shortly.
            `)
            .setColor('AQUA')
            .setFooter({
                text: 'Vortex | Ticket',
                iconURL: 'https://pinymedia.web.app/VortexIcon.png'
            })
            .setTimestamp()

        ticketChannel.send({
            embeds: [embed]
        })

        const attentionMessage = await ticketChannel.send(`<@${interaction.user.id}>`);

        attentionMessage.delete();
    }
})