//const stuff
const client = require('./client'); 
require('dotenv').config();
// Command Stuff :P
client.on("messageCreate", msg => {
    if (!msg.guild.id === '858790500605100062') {
        return
    } else {
    if (msg.author.id === '965264123246043156' && msg.channel.id === '859124610049507348') {
        msg.channel.send(`<@&965263575801298964>`)
    }

    if (msg.author.bot) {
        //Detecting dyno and fixing it's message because it is broken
        if (msg.content === '@TwitchPing Daal is live!' && msg.channel.id === '859124610049507348') {
            msg.channel.send('<@&965122064312860743>')
        }
    } else {
        if (msg.content.toLowerCase().startsWith('$socials')) {
            if (msg.content.toLowerCase().endsWith('twitter')) {
                msg.reply('https://twitter.com/DaalSAVAGE')
            } else {
                if (msg.content.toLowerCase().endsWith('twitch')) {
                    msg.reply('https://twitch.tv/daalsavage786')
                } else {
                    if (msg.content.toLowerCase().endsWith('discord')) {
                        msg.reply('https://bit.ly/DaalDis')
                    } else {
                        msg.reply('https://bit.ly/DaalSAVAGE')
                    }
                }
            }
        }
    }
  }
});