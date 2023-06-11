const client = require('../client');
const config = require('../config');
const fs = require('fs');
const path = require('path');

client.on('messageCreate', msg => {
    if (msg.guild.id === '1015322440152383539') {
        fs.appendFileSync(path.resolve('./logs/olilz.log'), `[${new Date()}] ${msg.author.tag} / ${msg.author.id}: 
        content: ${msg.content}
        attachments: ${msg.attachments.map(a => a.url).join(', ')}
        timestamp: ${msg.createdTimestamp}
        channel: ${msg.channel.name} / ${msg.channel.id}
        author: ${msg.author.tag} / ${msg.author.id}

`)
    
        if (msg.content.toLowerCase().startsWith('$request-logs')) {
            const author = msg.author

            if (author.id === config.users.olilz || author.id === config.users.piny) {
                author.send({
                    content: 'The logs that you requested are attached.',
                    files: [ path.resolve('./logs/olilz.log') ]
                })
            }
        }

        if (msg.channel.id === '1015524725184802856' && msg.author.id === '678344927997853742' && 1 === 2 /** Temp disabled */) {
            console.log('Temp > Temp')
            const TweetShiftEmbed = msg.embeds[0];
            let tweet = {}
    
            tweet.author = {
                name: TweetShiftEmbed?.author?.name,
                icon: TweetShiftEmbed.author.iconURL
            };
    
            tweet.content = TweetShiftEmbed.description;
    
            tweet.link = TweetShiftEmbed.author.url;
    
            tweet.image = TweetShiftEmbed?.image?.url;
    
            tweet.timestamp = TweetShiftEmbed.timestamp;
    
            const embed = new MessageEmbed()
                .setAuthor({
                    name: tweet.author?.name,
                    iconURL: tweet.author?.icon
                })
                .setFooter({
                    text: 'Tweet',
                    iconURL: 'https://pinymedia.web.app/DaalbotCircle.png'
                })
                .setDescription(tweet.content)
                .setTitle(`New Tweet from ${tweet.author?.name.split('(')[1].split(')')[0]}`)
                .setURL(tweet.link)
                .setTimestamp(tweet.timestamp)
                .setImage(tweet.image)
                .setColor('#00aae3')
    
            msg.channel.send({ content: '<@&1016754776337289357>', embeds: [embed] });
            // msg.delete();
        }
    }
})