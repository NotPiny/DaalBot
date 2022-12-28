// const client = require('../client.js');
// const fs = require('fs');
// const path = require('path');
// const daalbot = require('../daalbot.js');
// const config = require('../config.json');

// client.on('channelCreate', channel => {
//     if (!config.WOKCommands.TestServers.includes(channel.guild.id)) return; // Comment this to enable the feature on all servers

//     if (fs.existsSync(path.resolve(`./db/verify/${channel.guild.id}.role`))) {
//         if (fs.existsSync(path.resolve(`./db/verify/${channel.guild.id}.autoUpdate`))) {
//             if (fs.readFileSync(path.resolve(`./db/verify/${channel.guild.id}.autoUpdate`)) == 'true') {
//                 if (!channel.permissionsFor(channel.guild.roles.everyone).has('VIEW_CHANNEL')) return; // If the channel is not visible to everyone, don't do anything

//                 // Gather the role
//                 const roleId = fs.readFileSync(path.resolve(`./db/verify/${channel.guild.id}.role`));
//                 const role = daalbot.getRole(channel.guild.id, roleId);

//                 // Make sure the role exists
//                 if (role == 'Role not found.') return;
//                 if (role == 'Server not found.') return;
//                 if (role == undefined) return;

//                 // Update the permissions
//                 channel.permissionOverwrites.edit(role, {
//                     SEND_MESSAGES: true
//                 })

//                 channel.permissionOverwrites.edit(channel.guild.roles.everyone, {
//                     SEND_MESSAGES: false
//                 })
//             }
//         }
//     }
// })