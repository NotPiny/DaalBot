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

        let newActivity = newActivityRaw;

        placeHolderArray.forEach(placeHolder => {
            newActivity = newActivity.replace(placeHolder.name, placeHolder.value)
        })

        if (newActivity.startsWith('<t>')) {
            // Status is a custom type
            
            // Remove the <t> from the string
            newActivity = newActivity.slice(3)

            // Split string based on </t>
            const splitActivity = newActivity.split('</t>')
            const type = splitActivity[0]
            newActivity = splitActivity[1].replace('</t>', '')

            client.user.setActivity(newActivity, { type: type })
        } else {
            // Status is a default type
            client.user.setActivity(newActivity, { type: 'STREAMING' })
        }

        botLog(`Status > Status is now "${newActivity}"`)
      }, 3600000);
})