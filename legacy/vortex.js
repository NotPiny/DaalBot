//const stuff 
const client = require('../client'); require('dotenv').config(); // Loads all info needed to login as the bot 
// Command Stuff :P
client.on("messageCreate", msg => {
    if (msg.guild.id === '973711816226136095') { // Checks if guild id is the same as the vortex server
        if (msg.channel.id === '1005373380075192360') { // Checks if message was sent in the hi channel
            if (msg.author.id === client.user.id) return;
            if (msg.content.toLowerCase().startsWith('hi')) { // Checks if message begins with "hi"
                msg.channel.send('hi') // Sends "hi" to the channel
            }
        }
    } else {
        return // Returns if guild id does not match
    }
})