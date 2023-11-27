// NEW

const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');
const client = require('../client.js');
const getUserTweets = require('../twitter/user-parse.js');

const sendNewTweets = async (username, channelEntries) => {
    const tweets = await getUserTweets(username);
    console.log(tweets)

    if (tweets.changed) {
        const newTweets = tweets.changes;

        for (const tweet of newTweets) {
            const embed = new Discord.EmbedBuilder()
                .setTitle('New Tweet')
                .setURL(tweet.link)
                .setDescription(tweet.content)
                .setAuthor({
                    name: tweet.author.displayName,
                    iconURL: tweet.author.avatar,
                    url: `https://twitter.com/${username}`
                })
                .setColor('BLUE')
                .setTimestamp();

            if (tweet.media.length > 0) {
                embed.setImage(tweet.media[0].src);
            }

            for (const entry of channelEntries) {
                const channel = client.channels.cache.get(entry.channel.id);

                if (channel) {
                    await channel.send({
                        content: entry.channel.role ? `<@&${entry.channel.role}>` : null,
                        embeds: [embed]
                    });
                }
            }
        }
    }
};

setInterval(async () => {
    const twitterJson = JSON.parse(fs.readFileSync(path.resolve('./db/socialalert/twitter.json'), 'utf8'));

    for (const { username, channel: { id, role } } of twitterJson) {
        const channelEntries = twitterJson.filter(i => i.username === username);

        await sendNewTweets(username, channelEntries);
    }
}, 5 * 60 * 1000);

// OLD

// const fs = require('fs');
// const path = require('path');
// const Discord = require('discord.js');
// const client = require('../client.js');

// setInterval(() => {
//     /**
//      * @type {{username: string, channel: {id: string, role: string | null}}[]}
//      */
//     const twitterJson = JSON.parse(fs.readFileSync(path.resolve(`./db/socialalert/twitter.json`), 'utf8'))

//     /**
//      * @type {string[]}
//      */
//     let completedUsers = [];

//     twitterJson.forEach(async item => {
//         if (completedUsers.includes(item.username)) return;

//         const tweets = await getUserTweets(item.username);

//         if (tweets.changed) {
//             const newTweets = tweets.changes;

//             newTweets.forEach(async(tweet) => {
//                 const userEntries = twitterJson.filter(i => i.username === item.username); // Get all channels that have this user

//                 userEntries.forEach(async(entry) => {
//                     const channel = client.channels.cache.get(entry.channel.id);

//                     if (channel) {
//                         const embed = new Discord.EmbedBuilder()
//                             .setTitle('New Tweet')
//                             .setURL(tweet.link)
//                             .setDescription(tweet.content)
//                             .setAuthor({
//                                 name: tweet.author.displayName,
//                                 iconURL: tweet.author.avatar,
//                                 url: `https://twitter.com/${item.username}`
//                             })
//                             .setColor('Blue')
//                             .setTimestamp();

//                         if (tweet.media.length > 0) {
//                             embed.setImage(tweet.media[0].src);
//                         }

//                         channel.send({
//                             content: entry.channel.role ? `<@&${entry.channel.role}>` : null,
//                             embeds: [embed]
//                         });
//                     }
//                 })
//             })
//         }

//         completedUsers.push(item.username);
//     })
// }, 5 * 60 * 1000)