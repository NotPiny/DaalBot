const client = require('../client.js');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');

client.on('guildMemberUpdate', (oldMember, newMember) => {
    if (oldMember.premiumSinceTimestamp !== newMember.premiumSinceTimestamp || oldMember.id === '900126154881646634') {
        if (!oldMember.guild.id !== '1001929445478781030') return;

        const embed = new MessageEmbed()
            .setTitle('New Boost!')
            .setDescription(`**${newMember.user.tag}** just boosted the server!`)
            .setColor('GREEN')
            .setTimestamp()

        const usersFile = JSON.parse(fs.readFileSync('./users.json'))

        // Check if the user has a entry in the users.json file
        if (usersFile[newMember.user.id]) {
            const userData = usersFile[newMember.user.id]

            const boost = oldMember.guild.premiumSubscriptionCount > newMember.guild.premiumSubscriptionCount;
            
            if (boost) {
                // If the user has boosted the server

                userData.boosts += 1
                userData.boostsLeft += 1
            } else {
                // If the user has removed a boost from the server

                userData.boosts -= 1
                userData.boostsLeft -= 1
            }
            
            fs.writeFileSync('./users.json', JSON.stringify(usersFile, null, 4))
        } else {
            // Its the users first boost

            usersFile[newMember.user.id] = {
                id: newMember.user.id,
                boosts: 1,
                boostsLeft: 1
            }

            fs.writeFileSync('./users.json', JSON.stringify(usersFile, null, 4))
        }
    }
})