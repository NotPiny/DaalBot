const daalbot = require('../../daalbot.js');
const Discord = require('discord.js');
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

    callback: ({ interaction, args, client }) => {
        const type = interaction.options.getString('type');
        const id = interaction.options.getString('id');

        if (type === 'server') {
            const server = daalbot.fetchServer(id);
            if (server === 'Server not found.') {
                return 'Server not found.';
            } else {
                return `Result: 
                \`\`\`
Server Name: ${server.name}
Server ID: ${server.id}
Server Owner: ${daalbot.getUser(server.ownerId).tag}
Server Owner ID: ${server.ownerId}
Server Member Count: ${server.memberCount}
                \`\`\``
            }
        }

        if (type === 'user') {
            const user = daalbot.getUser(id);
            if (user === 'User not found.') {
                return 'User not found.';
            } else {
                const embed = new Discord.MessageEmbed()
                    .setTitle(`User: ${user.tag}`)
                    .setThumbnail(user.displayAvatarURL())
                    .setDescription(`User Tag: ${user.tag}\nUser ID: ${user.id}\nUser Avatar: ${user.displayAvatarURL()}\nBot: ${user.bot}\nCreated Timestamp: ${user.createdTimestamp}\nCreated At: ${user.createdAt}`);
                
                interaction.reply({
                    embeds: [embed]
                })
            }
        }

        if (type === 'role') {
            const role = daalbot.getRole(interaction.guild.id, id);
            if (role === 'Role not found.') {
                return 'Role not found.';
            } else {
                const embed = new Discord.MessageEmbed()
                    .setTitle(`Role: ${role.name}`)
                    .setColor(role.color)
                    .setDescription(`Role Name: ${role.name}\nRole ID: ${role.id}\nRole Color: ${role.hexColor}\nRole Created Timestamp: ${role.createdTimestamp}\nRole Created At: ${role.createdAt}`);
                interaction.reply({
                    embeds: [embed]
                })
            }
        }
    }
};