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
        const newActivity = config.activities[randomIndex];
    
        client.user.setActivity(newActivity, {
        type: "STREAMING",
        url: "https://www.twitch.tv/daalbott"
        });
        botLog(`Status > Status is now "${newActivity}"`)
      }, 3600000);
})