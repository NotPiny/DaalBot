const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');
const client = require('../client.js');
const getUserTweets = require('../twitter/user-parse.js');

const sendNewTweets = async (username, channelEntries) => {
    const tweets = await getUserTweets(username);

    if (tweets.changed) {
        const newTweets = tweets.changes;

        for (const tweet of newTweets) {
            const embed = new Discord.EmbedBuilder()
                .setTitle('New Tweet')
                .setURL(tweet.link)
                .setDescription(`${tweet.content.length >= 1 ? tweet.content : 'Empty content'}`)
                .setAuthor({
                    name: tweet.author.displayName,
                    iconURL: tweet.author.avatar,
                    url: `https://twitter.com/${username}`
                })
                .setColor('Blue')
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
        // if (id !== '1017715576073895958') continue; // Skip if channel if not testing channel (Debug)
        const channelEntries = twitterJson.filter(i => i.username === username);

        await sendNewTweets(username, channelEntries);
    }
}, 5 * 60 * 1000);