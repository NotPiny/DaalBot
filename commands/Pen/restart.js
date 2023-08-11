const config = require('../../config.json');
const { MessageEmbed } = require('discord.js');
const client = require('../../daalbot.js').client;
module.exports = {
    category: 'Pen',
    description: 'Restarts the bot',
  
    slash: true,
    testOnly: true,
  
    ownerOnly: true,
  
    callback: () => {
        client.user?.setPresence({
            status: 'idle',
            activities: [
                {
                    name: 'Restarting...',
                },
            ],
        })

        const embed = new MessageEmbed()
            .setTitle('Restarting...')
            .setDescription('The bot is restarting')
            .setColor('YELLOW')
            .setTimestamp()

        client.channels.cache.get('1138413163319132231').send({
            embeds: [embed]
        })

        setTimeout(() => {require('child_process').execSync('pm2 restart 1')}, 5 * 1000)
    },
  }
  