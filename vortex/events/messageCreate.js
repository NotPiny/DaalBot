const client = require('../../client.js');
const config = require('../../config.json');
const { MessageEmbed } = require('discord.js');

client.on('messageCreate', msg => {
    if (msg.guild.id !== config.servers.vortex.id) return;

    if (msg.channel.id === '974375088642228344' && msg.author.id === '1030590008345768048') {
        const TweetShiftEmbed = msg.embeds[0];
        let tweet = {}

        tweet.author = {
            name: TweetShiftEmbed.author.name,
            icon: TweetShiftEmbed.author.iconURL
        };

        tweet.content = TweetShiftEmbed.description;

        tweet.link = msg.content.split('(')[1].split(')')[0];

        tweet.image = TweetShiftEmbed?.image?.url;

        tweet.timestamp = TweetShiftEmbed.timestamp;

        const embed = new MessageEmbed()
            .setAuthor({
                name: tweet.author.name,
                iconURL: tweet.author.icon
            })
            .setFooter({
                text: 'Tweet',
                iconURL: 'https://pinymedia.web.app/DaalbotCircle.png'
            })
            .setDescription(tweet.content)
            .setTitle(`New Tweet from ${tweet.author.name.split('(')[1].split(')')[0]}`)
            .setURL(tweet.link)
            .setTimestamp(tweet.timestamp)
            .setImage(tweet.image)
            .setColor('#00aae3')

        msg.channel.send({ content: '<@&981065134569029652>', embeds: [embed] });
        msg.delete();
    } else if (msg.content === '$simjoin' && msg.author.id === config.users.piny) {
        // client.emit('guildMemberAdd', msg.member);
    }
})