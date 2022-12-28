const fs = require('fs');
const path = require('path');
const daalbot = require('../../daalbot.js');

module.exports = {
    category: 'Guild',
    description: 'Sets the auto welcome settings for the server',

    slash: true,
    testOnly: true, //guild testing when true
    guildOnly: true,

    options: [
        {
            name: 'channel',
            description: 'The channel to send the welcome message in',
            type: 'CHANNEL',
            required: true,
        },
        {
            name: 'message',
            description: 'The message to send when a user joins the server (Use {ping} to ping the user)',
            type: 'STRING',
            required: true,
        }
    ],

    callback: ({ interaction }) => {
        const guild = daalbot.fetchServer(interaction.guild.id); 
        const channel = daalbot.getChannel(guild.id, interaction.options.getChannel('channel').id);
        const message = `${interaction.options.getString('message')}`;
        
        if (!channel) return 'Channel not found';

        data = {
            channel: channel.id,
            message: message
        }

        const dbFolder = path.resolve('./db/welcome')

        daalbot.fs.write(`${dbFolder}/${guild.id}.json`, JSON.stringify(data, null, 4));

        return `Welcome message set to "${message}" in <#${channel.id}>`;
    }
}