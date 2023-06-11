const { Webhook } = require("discord-webhook.js")
const WebhookMessageBuilder = require("discord-webhook.js").MessageBuilder
const axios = require("axios")
require('dotenv').config()
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const AlertWebhook = new Webhook(process.env.WEBHOOK)
AlertWebhook.setUsername("DaalBot alert")

const startingBearer = process.env.TWITCH_BEARER // The bearer that is in the .env file when the bot starts
let Bearer = process.env.TWITCH_BEARER // The bearer that will be updated if it's invalid

async function updateBearer() {
    try {
        const request = await axios.get('https://api.twitch.tv/helix/search/channels?query=daalbott', {
            headers: {
                'Authorization': `Bearer ${Bearer}`,
                'Client-Id': process.env.TWITCH_CLIENTID
            }
        })
    } catch {
        // If the request fails, it means the bearer is invalid
        const GetNewBearerReq = await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENTID}&client_secret=${process.env.TWITCH_CLIENTSECRET}&grant_type=client_credentials`)
        Bearer = GetNewBearerReq.data.access_token

        // Update the .env file
        const dotenvpath = path.resolve('./.env')

        const currentEnv = fs.readFileSync(dotenvpath, 'utf8')
        const newEnv = currentEnv.replace(startingBearer, Bearer)

        fs.writeFileSync(dotenvpath, newEnv)

        // Logs
        console.log('Twitch link > Bearer updated')

        // Test the new bearer
        await updateBearer()
    }
}

async function checkIfLive(users) {
    let url = `https://api.twitch.tv/helix/streams?user_id=798413363`

    for (i = 0; i < users.length; i++) {
        const user = users[i]

        url += `&user_id=${user}`
    }

    const request = await axios.get(url, {
        headers: {
            'Authorization': `Bearer ${Bearer}`,
            'Client-Id': process.env.TWITCH_CLIENTID
        }
    })

    const liveUsers = request.data.data

    return liveUsers;
}

(async() => {
    await updateBearer()

    setInterval(async() => {
        const data = fs.readFileSync(path.resolve('./db/socialalert/twitch.txt'), 'utf8').split('\n')

        let users = []
        let userData = []

        data.forEach(async(user) => {
            const userId = user.split(',')[0]
            const webhook = user.split(',')[1]

            const key = Buffer.from(process.env.TWITCH_KEY, 'hex');
            const iv = Buffer.from(process.env.TWITCH_IV, 'hex');

            const decipher = crypto.createDecipheriv('aes256', key, iv);

            const decryptedWebhook = decipher.update(webhook, 'hex', 'utf-8') + decipher.final('utf8');

            users.push(userId)
            userData.push({
                id: userId,
                webhook: decryptedWebhook
            })
        })

        const liveUsers = await checkIfLive(users)

        liveUsers.forEach(async(user) => {
            const liveUserData = userData.filter(i => i.id == user.user_id)[0]

            const role = data.filter(i => i.split(',')[0] == user.user_id)[0].split(',')[2]

            const liveUserId = user.user_id

            const detectedLiveUsers = fs.readFileSync(path.resolve('./db/socialalert/twitch.detected'), 'utf8').split('\n')

            if (detectedLiveUsers.includes(liveUserId)) return; 

            if (liveUserData) {
                const embed = new WebhookMessageBuilder()
                    .setTitle(`${user.user_name} is now live on Twitch!`)
                    .setURL(`https://twitch.tv/${user.user_name}`)
                    .setImage(user.thumbnail_url.replace('{width}', '1920').replace('{height}', '1080'))
                    .setColor('PURPLE')
                    .addField('Title', user.title, true)
                    .addField('Game', user.game_name, true)
                    .setTimestamp();

                const webhook = new Webhook(liveUserData.webhook)

                webhook.send(`${role == 'none' ? `<@&${role}> ` : ''}${user.user_name} is live at [twitch.tv/${user.user_name}](<https://twitch.tv/${user.user_login}>)`, {
                    embeds: [embed]
                })

                fs.appendFileSync(path.resolve('./db/socialalert/twitch.detected'), `\n${liveUserId}`)
            }
        })
    }, 1000 * 30)

    setInterval(async() => {
        // Check if detected users are still live
        const detectedLiveUsers = fs.readFileSync(path.resolve('./db/socialalert/twitch.detected'), 'utf8').split('\n')

        // Remove the first element of the array (it's empty)
        detectedLiveUsers.shift()

        const liveUsers = await checkIfLive(detectedLiveUsers)

        let newFile = ''

        liveUsers.forEach(async(user) => {
            const liveUserId = user.user_id

            if (detectedLiveUsers.includes(liveUserId)) {
                newFile += `\n${liveUserId}`

                fs.writeFileSync(path.resolve('./db/socialalert/twitch.detected'), newFile)
            }
        })
    }, 1000 * 90)
})();