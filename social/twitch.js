const axios = require("axios")
require('dotenv').config()
const fs = require('fs')
const path = require('path')
const client = require('../client.js')
const { EmbedBuilder, ChannelType } = require('discord.js')

const startingBearer = process.env.TWITCH_BEARER // The bearer that is in the .env file when the bot starts
let Bearer = process.env.TWITCH_BEARER // The bearer that will be updated if it's invalid

client.on('ready', () => {
    console.log('Twitch link > Ready') 
})

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

async function main() {
    await updateBearer()

    setInterval(async() => {
        const data = fs.readFileSync(path.resolve('./db/socialalert/twitch.txt'), 'utf8').split('\n')
        const roleData = JSON.parse(fs.readFileSync(path.resolve('./db/socialalert/twitch_roles.json'), 'utf8'))

        let users = []
        let userData = []

        data.forEach(async(user) => {
            const userId = user.split(',')[0]
            const channelsTxt = user.split(',')[1]
            const channels = channelsTxt.split('|')

            users.push(userId)
            userData.push({
                id: userId,
                channels: channels,
            })
        })

        const liveUsers = await checkIfLive(users)

        liveUsers.forEach(async(user) => {
            const liveUserData = userData.filter(i => i.id == user.user_id)[0]

            const liveUserId = user.user_id

            const detectedLiveUsers = fs.readFileSync(path.resolve('./db/socialalert/twitch.detected'), 'utf8').split('\n')

            if (detectedLiveUsers.includes(liveUserId)) return; 

            if (liveUserData) {
                const embed = new EmbedBuilder()
                    .setTitle(`${user.user_name} is now live on Twitch!`)
                    .setURL(`https://twitch.tv/${user.user_name}`)
                    .setImage(user.thumbnail_url.replace('{width}', '1920').replace('{height}', '1080') + `?r=${Math.random() * 10000}`) // Add a random number to the end of the url to prevent caching :D
                    .setColor('#9B5AB4')
                    .addFields(
                        { name: 'Title', value: user.title, inline: true },
                        { name: 'Game', value: user.game_name, inline: true }
                    )
                    .setTimestamp();

                liveUserData.channels.forEach(async(channel) => {
                    const channelObj = client.channels.cache.get(channel)

                    let pingRoleId = 'none'

                    const channelRoleData = roleData.filter(i => i.id == liveUserId)[0]
                    const channelRole = `${channelRoleData.channels.filter(i => i.id == channel)[0].role}`

                    pingRoleId = channelRole

                    if (channelObj.type != ChannelType.GuildText) return console.log(`Twitch link > Channel ${channel} is not a text channel`);
                    if (channelObj == undefined) return console.log(`Twitch link > Channel ${channel} not found`)

                    if (channelObj) {
                        pingRoleId === 'none' ? channelObj.send({ embeds: [embed] }) : channelObj.send({ content: `<@&${pingRoleId}>`, embeds: [embed] })
                    } else {
                        console.log(`Twitch link > Channel ${channel} not found`)
                    }
                })

                fs.appendFileSync(path.resolve('./db/socialalert/twitch.detected'), `\n${liveUserId}`)
            }
        })
    }, 1000 * 30)

    setInterval(async () => {
        // Check if detected users are still live
        const detectedLiveUsers = fs.readFileSync(
            path.resolve('./db/socialalert/twitch.detected'),
            'utf8'
        ).split('\n');
      
        // Remove the first element of the array (it's empty)
        detectedLiveUsers.shift();
      
        const liveUsers = await checkIfLive(detectedLiveUsers);
      
        let newFile = '';
      
        for (let i = 0; i < liveUsers.length; i++) {
            const user = liveUsers[i];
            const liveUserId = user.user_id;
      
            if (detectedLiveUsers.includes(liveUserId)) {
                newFile += `\n${liveUserId}`;
            }
        }
      
        fs.writeFileSync(
            path.resolve('./db/socialalert/twitch.detected'),
            newFile
        );
      }, 1000 * 90);
};

main();