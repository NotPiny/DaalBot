const daalbot = require('../../daalbot.js');
const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'permission',
    description: 'Check the permissions of the bot.',
    category: 'Guild',

    guildOnly: true,
    testOnly: true,

    slash: true,

    options: [
        {
            name: 'check',
            description: 'Checks if the bot has the correct permissions.',
            type: 'SUB_COMMAND'
        }
    ],

    callback: async ({ interaction }) => {
        const client = daalbot.client;

        const guild = client.guilds.cache.get(interaction.guild_id);

        const member = await guild?.members?.fetch(daalbot?.getUser(client?.user?.id));

        if (member == Discord.GuildMember) console.log(':D');

        const permissions = member.permissions.toArray();

        if (permissions.includes('ADMINISTRATOR')) {
            return 'The bot has the correct permissions.';
        } else {
            return 'The bot does not have administrator permissions, These are required for the bot to function properly.';
        }
    }
}