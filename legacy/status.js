const { ActivityType } = require('discord.js');
const client = require('../client');
const config = require('../config.json')
function botLog(text) {
    try {
    // client.channels.cache.find(channel => channel.id === config.Logchannel).send(text);
    console.log(text)
    } catch {
        console.log('Something went wrong in botlog in status.js')
    }
}
client.on('ready', () => {
    setInterval(() => {
        // generate random number between 1 and list length.
        const randomIndex = Math.floor(Math.random() * (config.activities.length - 1) + 1);
        const newActivityRaw = config.activities[randomIndex];
    
        const placeHolderArray = [
            {
                name: '{GUILDS}',
                value: client.guilds.cache.size
            },
            {
                name: '{USERS}',
                value: client.users.cache.size
            },
            {
                name: '{HUMANS}',
                value: client.users.cache.filter(user => !user.bot).size
            },
            {
                name: '{BOTS}',
                value: client.users.cache.filter(user => user.bot).size
            },
            {
                name: '{STATUS_COUNT}',
                value: config.activities.length
            }
        ]

        // replace placeholders with actual values
        let newActivity = newActivityRaw;

        placeHolderArray.forEach(placeHolder => {
            newActivity = newActivity.replace(placeHolder.name, placeHolder.value)
        })
        
        client.user.setActivity(newActivity, { type: ActivityType.Custom })

        botLog(`Status > Status is now "${newActivity}"`)
      }, 3600000);
})