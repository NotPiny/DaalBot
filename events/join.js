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

    const antiraid_dbFolder = path.resolve(`./db/antiraid/${member.guild.id}`);
    const antiraid_dbToggle = path.resolve(`./db/antiraid/${member.guild.id}.toggle`);

    if (fs.existsSync(`${antiraid_dbFolder}`)) {
        if (fs.existsSync(`${antiraid_dbToggle}`)) {
            if (!fs.existsSync(`${antiraid_dbFolder}/${member.guild.id}.action`)) {
                return;
            }
            const action = fs.readFileSync(`${antiraid_dbFolder}/${member.guild.id}.action`, 'utf8');
            const data = fs.readFileSync(`${antiraid_dbToggle}`, 'utf8').split(',');
            const all = data[0];
            const names = data[1];
            const threshold = data[2];

            if (all == 'true') {
                if (names == 'true') {
                    const files = fs.readdirSync(`${antiraid_dbFolder}/names`);

                    let names = [];

                    files.forEach(file => {
                        const name = file.replace('.name', '');
                        
                        names.push(name);
                    })

                    names.forEach(name => {
                        if (member.user.username.includes(name)) {
                            
                            if (action == 'kick') {
                                member.kick(`AntiRaid > Name matches a known raid name.`)
                                    .then(() => {
                                        console.log(`AntiRaid > Kicked ${member.user.tag} for having a blacklisted name.`);
                                    })
                                    .catch(err => {
                                        console.log(`AntiRaid > Failed to kick ${member.user.tag} for having a blacklisted name.`);
                                    })
                            }

                            if (action == 'ban') {
                                member.ban({ reason: `AntiRaid > Name matches a known raid name.` })
                                    .then(() => {
                                        console.log(`AntiRaid > Banned ${member.user.tag} for having a blacklisted name.`);
                                    })
                                    .catch(err => {
                                        console.log(`AntiRaid > Failed to ban ${member.user.tag} for having a blacklisted name.`);
                                    })
                            }
                        }
                    })
                }

                if (threshold == 'true') {
                    // TODO
                }
            }
        }
    }
});