const daalbot = require('../../daalbot.js');
module.exports = {
    name: 'addemote',
    description: 'Adds an emote to the server.',
    category: 'Guild',

    guildOnly: true,
    requireRoles: true,
    testOnly: false,

    slash: true,
    options: [
        {
            name: 'emote',
            description: 'The emote to add.',
            type: 'STRING',
            required: true
        },
        {
            name: 'name',
            description: 'The name of the emote.',
            type: 'STRING',
            required: false
        }
    ],

    callback: async (interaction) => {
        let emoteText = `${await interaction.options.getString('emote')}`.trim();

        let emoteArray = emoteText.split(' ');

        const guild = daalbot.fetchServer(interaction.guild.id);
        
        // emoteArray.forEach(async(emote) => {
            let emoteID = emoteText.split(':')[2].replace('>', '');
            let emoteName = await interaction.options.getString('name') || emoteText.split(':')[1];
            let emoteURL = `https://cdn.discordapp.com/emojis/${emoteID}.gif`;

            try {
                const newEmote = await daalbot.client.guilds.cache.get(guild.id).emojis.create(emoteURL, emoteName);
            } catch {
                try {
                    const newEmotePNG = await daalbot.client.guilds.cache.get(guild.id).emojis.create(emoteURL.replace('.gif', '.png'), emoteName);
                } catch {
                    try {
                        const newEmoteJPG = await daalbot.client.guilds.cache.get(guild.id).emojis.create(emoteURL.replace('.gif', '.jpg'), emoteName);
                    } catch {
                        return `Failed to add the emote ;(`;
                    }
                }
            }
        // })

        return `Added the emote to the server!`;
    }
}