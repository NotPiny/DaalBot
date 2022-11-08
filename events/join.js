const client = require('../client.js');
const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');
const daalbot = require('../daalbot.js');

client.on('guildMemberAdd', (member) => {
    const autorole_dbFolder = path.resolve(`./db/autorole/${member.guild.id}`);
    
    if (fs.existsSync(`${autorole_dbFolder}`)) {
        const files = fs.readdirSync(`${autorole_dbFolder}`);

        let roles = [];

        files.forEach(file => {
            const roleID = file.replace('.id', '');
            roles.push(roleID);
        })

        roles.forEach(role => {
            const roleObj = daalbot.getRole(member.guild.id, role);
            if (roleObj == 'Server not found.') {
                console.log(`Autorole > Server not found.`);
            } else if (roleObj == 'Role not found.') {
                console.log(`Autorole > Role not found.`);
            } else if (roleObj == undefined) {
                console.log(`Autorole > Role is undefined.`);
            }

            member.roles.add(roleObj)
                .then(() => {
                    console.log(`Autorole > Added ${roleObj.name} to ${member.user.tag}`);
                })
                .catch(err => {
                    console.log(`Autorole > Failed to add ${roleObj.name} to ${member.user.tag}`);
                })
        });
    }

    const welcome_dbFolder = path.resolve(`./db/welcome`);

    // TODO
});