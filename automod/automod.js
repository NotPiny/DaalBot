// const fs = require('fs'); 
// const { readFileSync } = fs;
// const config = require("../config.json");
// const botPath = '..';
// const warnSchema = require('../models/warn-schema');
// const { MessageEmbed, Interaction } = require('discord.js');
// function read(file) {
//     try {
//         return readFileSync(file).toString();
//     } catch (err) {
//         console.log(err);
//     }
// }
// const profanityDefault = require(`../db/automod/lists.json`).profanityDefault;
// const client = require('../client.js');

//   client.on('messageCreate', (msg) => {
//         if (msg.author.bot) return;
//         if (msg.channel.type === 'DM') return;
//         if (msg.channel.type === 'GUILD_NEWS_THREAD') return;

//         const guildId = msg.guild.id;
//         const guild = msg.guild;
//         const member = msg.member;
//         const channel = msg.channel;
//         const content = msg.content;
//         const author = msg.author;
        
//         const rules = [
//             'invitelinks',
//             'profanity',
//             'caps',
//             'links'
//         ];
//         let inviteAction = 'Waiting for assignment...';
//         let profanityAction = 'Waiting for assignment...';
//         let capsAction = 'Waiting for assignment...';
//         let linksAction = 'Waiting for assignment...';

//         if (fs.existsSync(`../db/automod/${guildId}-invitelinks.action`)) { inviteAction = read(`../db/automod/${guildId}-invitelinks.action`); };
//         if (fs.existsSync(`../db/automod/${guildId}-profanity.action`)) { profanityAction = read(`../db/automod/${guildId}-profanity.action`); };
//         if (fs.existsSync(`../db/automod/${guildId}-caps.action`)) { capsAction = read(`../db/automod/${guildId}-caps.action`); };
//         if (fs.existsSync(`../db/automod/${guildId}-links.action`)) { linksAction = read(`../db/automod/${guildId}-links.action`); };

//         const inviteRegex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/gi;

//         console.log(inviteAction, profanityAction, capsAction, linksAction);

//         if (inviteRegex.test(content)) {
//             if (inviteAction === 'ban') {
//                 member.ban({ reason: `Automod: Invite Links` });
//             }

//             if (inviteAction === 'kick') {
//                 member.kick(`Automod: Invite Links`);
//             }

//             if (inviteAction === 'warn') {
//                 warnSchema.create({
//                     userId: author.id,
//                     staffId: client.user.id,
//                     guildId: guildId,
//                     reason: 'Automod: Invite Link'
//                 })
//             }

//             if (inviteAction === 'mute') {
//                 const role = guild.roles.cache.find(role => role.name === 'Muted');
//                 member.roles.add(role).then(() => {
//                     console.log(`Muted ${author.tag} for Invite Links`);
//                 }).catch(err => {
//                     console.log(err);
//                 })
//             }

//             if (inviteAction === 'delete') {
//                 if (msg.deletable) {
//                     msg.delete();
//                 }
//             }
//         }

//         if (content.includes(profanityDefault)) {
//             if (profanityAction === 'ban') {
//                 member.ban({ reason: `Automod: Profanity` });
//             }

//             if (profanityAction === 'kick') {
//                 member.kick(`Automod: Profanity`);
//             }

//             if (profanityAction === 'warn') {
//                 warnSchema.create({
//                     userId: author.id,
//                     staffId: client.user.id,
//                     guildId: guildId,
//                     reason: 'Automod: Profanity'
//                 })
//             }

//             if (profanityAction === 'mute') {
//                 const role = guild.roles.cache.find(role => role.name === 'Muted');
//                 member.roles.add(role).then(() => {
//                     console.log(`Muted ${author.tag} for Profanity`);
//                     if (msg.deletable) {
//                         msg.delete();
//                     }
//                 }).catch(err => {
//                     console.log(err);
//                 })
//             }

//             if (profanityAction === 'delete') {
//                 if (msg.deletable) {
//                     msg.delete();
//                 }
//             }
//         }

//         if (content === content.toUpperCase()) {
//             if (content.match(/[A-Z]/g).length >= msg.content.length / 2) {
//                 if (capsAction === 'ban') {
//                     member.ban({ reason: `Automod: Caps` });
//                 }

//                 if (capsAction === 'kick') {
//                     member.kick(`Automod: Caps`);
//                 }

//                 if (capsAction === 'warn') {
//                     warnSchema.create({
//                         userId: author.id,
//                         staffId: client.user.id,
//                         guildId: guildId,
//                         reason: 'Automod: Caps'
//                     })
//                 }

//                 if (capsAction === 'mute') {
//                     const role = guild.roles.cache.find(role => role.name === 'Muted');
//                     member.roles.add(role).then(() => {
//                         console.log(`Muted ${author.tag} for Caps`);
//                     }).catch(err => {
//                         console.log(err);
//                     })
//                 }

//                 if (capsAction === 'delete') {
//                     if (msg.deletable) {
//                         msg.delete();
//                     }
//                 }
//             }
//         }

//         if (content.includes('http://') || content.includes('https://')) {
//             if (linksAction === 'ban') {
//                 member.ban({ reason: `Automod: Links` });
//             }

//             if (linksAction === 'kick') {
//                 member.kick(`Automod: Links`);
//             }

//             if (linksAction === 'warn') {
//                 warnSchema.create({
//                     userId: author.id,
//                     staffId: client.user.id,
//                     guildId: guildId,
//                     reason: 'Automod: Links'
//                 })
//             }

//             if (linksAction === 'mute') {
//                 const role = guild.roles.cache.find(role => role.name === 'Muted');
//                 member.roles.add(role).then(() => {
//                     console.log(`Muted ${author.tag} for Links`);
//                 }).catch(err => {
//                     console.log(err);
//                 })
//             }

//             if (linksAction === 'delete') {
//                 if (msg.deletable) {
//                     msg.delete();
//                 }
//             }
//         }
// })