const daalbot = require('../../daalbot.js');
const Discord = require('discord.js');
require('dotenv').config();
module.exports = {
    name: 'lookup',
    description: 'Lookup info using a ID',
    category: 'Utility',
    slash: true,
    options: [
        {
            name: 'type',
            description: 'What type of information you want to lookup',
            type: 'STRING',
            required: true,
            choices: [
                {
                    name: 'Server',
                    value: 'server'
                },
                {
                    name: 'User',
                    value: 'user'
                },
                {
                    name: 'Role',
                    value: 'role'
                }
            ]
        },
        {
            name: 'id',
            description: 'The ID of the information you want to lookup',
            type: 'STRING',
            required: true,
        }
    ],
    testOnly: false,

    callback: ({ interaction }) => {
        const type = interaction.options.getString('type');
        const id = interaction.options.getString('id');

        if (type == 'user') {
            const cachedUser = daalbot.client.users.cache.get(id);

            if (cachedUser == undefined) {
                const APIUser = daalbot.api.discord.getUser(id);

                /**
                 * @type {string}
                */
                const userId = APIUser.id;

                /**
                 * @type {string}
                */
                const username = APIUser.username;
                
                /**
                 * @type {string}
                */
                const bannerColour = APIUser.banner_color;

                /**
                 * @type {string | null}
                */
                const banner = APIUser.banner;

                const avatar = `https://cdn.discordapp.com/avatars/${userId}/${APIUser.avatar}.png?size=1024`;

                /**
                 * @type {string}
                */
                const globalName = APIUser.global_name;

                const embed = new daalbot.embed()
                    .setTitle(`${globalName}'s profile`)
                    .setThumbnail(avatar)
                    .setColor(bannerColour)
                    .setFooter({
                        text: `ID: ${userId}`
                    })
                    .setDescription(`This user isnt in any servers the bot is in so all information is whats available from the API`)
                    .setFields([
                        {
                            name: 'Username',
                            value: username,
                            inline: true
                        },
                        {
                            name: 'Global Name',
                            value: globalName,
                            inline: true
                        },
                        {
                            name: 'Banner Colour',
                            value: bannerColour,
                            inline: false
                        },
                        {
                            name: 'Banner',
                            value: banner ? `[Click here](${banner})` : 'None',
                            inline: true
                        },
                        {
                            name: 'Avatar',
                            value: `[Click here](${avatar})`,
                            inline: true
                        }
                    ])
                    .setImage(banner ? banner : null)
                    .setTimestamp();

                interaction.reply({
                    embeds: [embed]
                });
            } else {
                const embed = new daalbot.embed()
                    .setTitle(`${cachedUser.globalName}'s profile`)
                    .setThumbnail(cachedUser.displayAvatarURL({ dynamic: true, size: 1024 }))
                    .setColor('Purple')
                    .setFooter({
                        text: `ID: ${cachedUser.id}`
                    })
                    .setFields([
                        {
                            name: 'Username',
                            value: cachedUser.username,
                            inline: true
                        },
                        {
                            name: 'Global Name',
                            value: cachedUser.globalName ? cachedUser.globalName : 'None',
                            inline: true
                        },
                        {
                            name: 'Accent Colour',
                            value: cachedUser.hexAccentColor ? cachedUser.hexAccentColor : 'None',
                            inline: false
                        },
                        {
                            name: 'Banner',
                            value: cachedUser.banner ? `[Click here](${cachedUser.bannerURL()})` : 'None',
                            inline: true
                        },
                        {
                            name: 'Avatar',
                            value: `[Click here](${cachedUser.displayAvatarURL({ dynamic: true, size: 1024 })})`,
                            inline: true
                        }
                    ])
                    .setImage(cachedUser.banner ? cachedUser.bannerURL() : null)
                    .setTimestamp();

                interaction.reply({
                    embeds: [embed]
                });
            }
        }

        if (type == 'server') {
            const cachedGuild = daalbot.client.guilds.cache.get(id);

            if (cachedGuild == undefined) {
                const embed = new daalbot.embed()
                    .setTitle('Server not found')
                    .setDescription(`Information for server with ID \`${id}\` could not be found.`)
                    .setColor('Red')
                    .setTimestamp();

                return interaction.reply({
                    embeds: [embed]
                });
            }

            const embed = new daalbot.embed()
                .setTitle(`${cachedGuild.name} (${cachedGuild.id})`)
                .setThumbnail(cachedGuild.iconURL({ dynamic: true, size: 1024 }))
                .setColor('Purple')
                .setFooter({
                    text: `ID: ${cachedGuild.id}`
                })
                .setFields([
                    {
                        name: 'Owner',
                        value: `<@${cachedGuild.ownerId}>`,
                        inline: true
                    },
                    {
                        name: 'Owner ID',
                        value: cachedGuild.ownerId,
                        inline: true
                    },
                    {
                        name: 'Member Count',
                        value: cachedGuild.memberCount,
                        inline: false
                    },
                    {
                        name: 'Region',
                        value: cachedGuild.region,
                        inline: false
                    },
                    {
                        name: 'Created At',
                        value: cachedGuild.createdAt,
                        inline: false
                    },
                    {
                        name: 'Channels',
                        value: cachedGuild.channels.cache.size,
                        inline: true
                    },
                    {
                        name: 'Roles',
                        value: cachedGuild.roles.cache.size,
                        inline: true
                    },
                    {
                        name: 'Emojis',
                        value: cachedGuild.emojis.cache.size,
                        inline: true
                    }
                ])
                .setImage(cachedGuild.bannerURL() ? cachedGuild.bannerURL() : null)
                .setTimestamp();

            interaction.reply({
                embeds: [embed]
            });
        }

        if (type == 'role') {
            const cachedRole = daalbot.client.guilds.cache.get(interaction.guildId).roles.cache.get(id);

            if (cachedRole == undefined) {
                const embed = new daalbot.embed()
                    .setTitle('Role not found')
                    .setDescription(`Information for role with ID \`${id}\` could not be found.`)
                    .setColor('Red')
                    .setTimestamp();

                return interaction.reply({
                    embeds: [embed]
                });
            }

            const embed = new daalbot.embed()
                .setTitle(`${cachedRole.name} (${cachedRole.id})`)
                .setColor('Purple')
                .setFooter({
                    text: `ID: ${cachedRole.id}`
                })
                .setFields([
                    {
                        name: 'Colour',
                        value: cachedRole.hexColor,
                        inline: false
                    },
                    {
                        name: 'Position',
                        value: cachedRole.position,
                        inline: true
                    },
                    {
                        name: 'Mentionable',
                        value: cachedRole.mentionable ? 'Yes' : 'No',
                        inline: true
                    },
                    {
                        name: 'Hoisted (Displayed Separately)',
                        value: cachedRole.hoist ? 'Yes' : 'No',
                        inline: true
                    }
                ])

            interaction.reply({
                embeds: [embed]
            });
        }
    }
};