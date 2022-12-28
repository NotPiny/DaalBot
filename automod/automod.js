const fs = require('fs'); 
const config = require("../config.json");
const botPath = '..';
const daalbot = require('../daalbot.js');
const warnSchema = require('../models/warn-schema');
const { MessageEmbed, Interaction } = require('discord.js');
function read(file) {
    try {
        if (fs.existsSync(file)) {
            return fs.readFileSync(file, 'utf8');
        } else {
            return 'File not found';
        }
    } catch (err) {
        console.log(err);
    }
}
const profanityDefault = require(`../db/automod/lists.json`).profanityDefault;
const client = require('../client.js');

  client.on('messageCreate', (msg) => {
        if (msg.author.bot) return;
        if (msg.channel.type === 'DM') return;
        if (msg.channel.type === 'GUILD_NEWS_THREAD') return;

        const guildId = msg.guild.id;
        const guild = msg.guild;
        const member = msg.member;
        const channel = msg.channel;
        const content = msg.content;
        const author = msg.author;
        const rules = [
            'invitelinks',
            'profanity',
            'caps',
            'links'
        ];
        const customBlockedWords = read(`../db/automod/${guildId}-CBW.list`).split('\n');

        function WADLTEMSG(reason) {
            const warningEmbed = new MessageEmbed()
                .setTitle('Warning')
                .setColor('RED')
                .setDescription(`You have been warned in ${guild.name} by automod for: ${reason}`)
                .setTimestamp();
            
            warnSchema.create({
                guildId: guildId,
                userId: author.id,
                staffId: client.user.id,
                reason: `Automod: ${reason}`
            })

            author.send({ embeds: [warningEmbed] }).then(() => {
                console.log(`Automod > Warned ${author.username} in ${guild.name} for ${reason}`);
            }).catch(() => {
                console.log(`Automod > Failed to warn ${author.username} in ${guild.name} for ${reason}`);
            }).finally(() => {
                msg.delete()
                .then(() => {
                    console.log(`Automod > Deleted message from ${author.username} in ${guild.name}`);
                })
                .catch(() => {
                    console.log(`Automod > Failed to delete message from ${author.username} in ${guild.name}`);
                });
            })
        }

        let inviteAction = 'Waiting for assignment...';
        let profanityAction = 'Waiting for assignment...';
        let capsAction = 'Waiting for assignment...';
        let linksAction = 'Waiting for assignment...';

        if (fs.existsSync(`../db/automod/${guildId}-invitelinks.action`)) { console.log('invites has a action file'); inviteAction = read(`../db/automod/${guildId}-invitelinks.action`); };
        if (fs.existsSync(`../db/automod/${guildId}-profanity.action`)) { profanityAction = read(`../db/automod/${guildId}-profanity.action`); };
        if (fs.existsSync(`../db/automod/${guildId}-caps.action`)) { capsAction = read(`../db/automod/${guildId}-caps.action`); };
        if (fs.existsSync(`../db/automod/${guildId}-links.action`)) { linksAction = read(`../db/automod/${guildId}-links.action`); };

        const inviteRegex = /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discordapp\.com\/invite)\/.+[a-z]/gi;

        // Uncomment to enable automods debug mode (yes i use console.log for debugging ok)
        // console.log(inviteAction, profanityAction, capsAction, linksAction);

        if (inviteRegex.test(content)) {
            if (inviteAction === 'ban') {
                member.ban({ reason: `Automod: Invite Links` });
            }

            if (inviteAction === 'kick') {
                member.kick(`Automod: Invite Links`);
            }

            if (inviteAction === 'warn') {
                WADLTEMSG('Invite Links');
            }

            if (inviteAction === 'mute') {
                const role = guild.roles.cache.find(role => role.name.toLowerCase() === 'Muted');
                member.roles.add(role).then(() => {
                    console.log(`Muted ${author.tag} for Invite Links`);
                }).catch(err => {
                    console.log(err);
                })
            }

            if (inviteAction === 'delete') {
                if (msg.deletable) {
                    msg.delete();
                }
            }
        }

        if (content.includes(profanityDefault)) {
            if (profanityAction === 'ban') {
                member.ban({ reason: `Automod: Profanity` });
            }

            if (profanityAction === 'kick') {
                member.kick(`Automod: Profanity`);
            }

            if (profanityAction === 'warn') {
                WADLTEMSG('Profanity');
            }

            if (profanityAction === 'mute') {
                const role = guild.roles.cache.find(role => role.name === 'Muted');
                member.roles.add(role).then(() => {
                    console.log(`Muted ${author.tag} for Profanity`);
                    if (msg.deletable) {
                        msg.delete();
                    }
                }).catch(err => {
                    console.log(err);
                })
            }

            if (profanityAction === 'delete') {
                if (msg.deletable) {
                    msg.delete();
                }
            }
        }

        if (content === content.toUpperCase()) {
            const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
            if (!content.toLowerCase().includes(letters)) return;
                if (capsAction === 'ban') {
                    member.ban({ reason: `Automod: Caps` });
                }

                if (capsAction === 'kick') {
                    member.kick(`Automod: Caps`);
                }

                if (capsAction === 'warn') {
                    WADLTEMSG('Caps');
                }

                if (capsAction === 'mute') {
                    const role = guild.roles.cache.find(role => role.name === 'Muted');
                    member.roles.add(role).then(() => {
                        console.log(`Muted ${author.tag} for Caps`);
                    }).catch(err => {
                        console.log(err);
                    })
                }

                if (capsAction === 'delete') {
                    if (msg.deletable) {
                        msg.delete();
                    }
                }
        }

        if (content.includes('http://') || content.includes('https://')) {
            if (linksAction === 'ban') {
                member.ban({ reason: `Automod: Links` });
            }

            if (linksAction === 'kick') {
                member.kick(`Automod: Links`);
            }

            if (linksAction === 'warn') {
                WADLTEMSG('Links');
            }

            if (linksAction === 'mute') {
                const role = guild.roles.cache.find(role => role.name === 'Muted');
                member.roles.add(role).then(() => {
                    console.log(`Muted ${author.tag} for Links`);
                }).catch(err => {
                    console.log(err);
                })
            }

            if (linksAction === 'delete') {
                if (msg.deletable) {
                    msg.delete();
                }
            }
        }
})