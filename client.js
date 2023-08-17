const { Client, IntentsBitField } = require('discord.js');
// const client = new Client({
//     intents: [
//         Intents.FLAGS.GUILDS, 
//         Intents.FLAGS.GUILD_MESSAGES, 
//         Intents.FLAGS.GUILD_MESSAGE_REACTIONS, 
//         Intents.FLAGS.GUILD_PRESENCES, 
//         Intents.FLAGS.GUILD_BANS, 
//         Intents.FLAGS.GUILD_MEMBERS, 
//         Intents.FLAGS.GUILD_WEBHOOKS
//     ],
//     shards: 'auto'
// });

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.GuildPresences,
        IntentsBitField.Flags.GuildModeration,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildWebhooks
    ]
})

module.exports = client;