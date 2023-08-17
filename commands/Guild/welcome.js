const fs = require('fs');
const path = require('path');
const daalbot = require('../../daalbot.js');
const DJS = require('discord.js');

module.exports = {
    category: 'Guild',
    description: 'Sets the auto welcome settings for the server',

    slash: true,
    // testOnly: true, //guild testing when true
    guildOnly: true,
    requireRoles: true,

    options: [
        {
            name: 'channel',
            description: 'The channel to send the welcome message in',
            type: 'CHANNEL',
            required: true,
        },
        {
            name: 'message',
            description: 'The message to send when a user joins the server (Use {user} to ping the user)',
            type: 'STRING',
            required: true,
        },
        {
            name: 'embed',
            description: 'Embed json (/embed to create)',
            type: 'STRING',
            required: false,
        }
    ],

    callback: ({ interaction }) => {
        const guild = daalbot.fetchServer(interaction.guild.id); 
        const channel = daalbot.getChannel(guild.id, interaction.options.getChannel('channel').id);
        const message = `${interaction.options.getString('message')}`;
        const embedString = interaction.options.getString('embed');

        const embedObject = JSON.parse(embedString);

        const embedJson = embedString != null ? new DJS.EmbedBuilder(embedObject).toJSON() : 'none';
        
        if (!channel) return 'Channel not found';

        data = {
            channel: channel.id,
            message: message,
            embed: embedJson,
        }

        const dbFolder = path.resolve('./db/welcome')

        daalbot.fs.write(`${dbFolder}/${guild.id}.json`, JSON.stringify(data, null, 4));

        return `Welcome message set to "${message}" in <#${channel.id}>`;
    }
}