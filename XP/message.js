const client = require('../client.js');
const config = require('../config.json');
const daalbot = require('../daalbot.js');
const fs = require('fs');
const path = require('path');
const DJS = require('discord.js');

client.on('messageCreate', msg => {
    if (msg.author.bot) return;
    if (msg.content.startsWith(['!', '$', '.'])) return;
    const XPamount = Math.floor(Math.random() * 10) + 1;
    
    const GuildXpFolder = path.resolve(`./db/xp/${msg.guild.id}`);
    const MemberXpFile = path.resolve(`./db/xp/${msg.guild.id}/${msg.author.id}.xp`);

    if (!fs.existsSync(GuildXpFolder)) {
        fs.mkdirSync(GuildXpFolder);
    }

    const newXp = fs.existsSync(MemberXpFile) ? `${parseInt(fs.readFileSync(MemberXpFile)) + XPamount}` : `${XPamount}`;

    daalbot.fs.write(MemberXpFile, newXp);

    const level = parseInt(newXp.slice(0, -3)) || 0;

    if (level == 0) return;

    const levelFile = path.resolve(`./db/xp/${msg.guild.id}/rewards/${level}.reward`);

    if (!fs.existsSync(levelFile)) return;

    const rewardRole = fs.readFileSync(levelFile, 'utf8')

    if (rewardRole == undefined) return;

    const role = daalbot.getRole(msg.guild.id, rewardRole);

    if (role == undefined || role == 'Role not found.' || role == 'Server not found.') return;

    if (msg.member.roles.cache.has(role.id)) return;

    msg.member.roles.add(role.id)
        .then(async() => {
            const silentUsers = fs.readFileSync(path.resolve(`./db/xp/silent.users`), 'utf8').split('\n');

            const levelUpChannel = daalbot.getChannel(msg.guild.id, await daalbot.db.getChannel(msg.guild.id, 'levels'));

            if (levelUpChannel == null) return;

            const levelUpEmbed = new DJS.EmbedBuilder()
                .setTitle('Level Up!')
                .setDescription(`Congratulations on leveling up <@${msg.author.id}>! You are now level ${level} and have unlocked the ${role.name} role`)
                .setTimestamp();

            const row = new DJS.ActionRowBuilder()

            const menuButton = new DJS.ButtonBuilder()
                .setLabel('Menu')
                .setStyle(DJS.ButtonStyle.Primary)
                .setCustomId('levelUpMenu')
                .setEmoji('📖');

            row.addComponents(menuButton);

            if (msg.guild.id == config.servers.vortex.id) {
                const vortexMoreInfoButton = new DJS.ButtonBuilder()
                    .setLabel('More Info')
                    .setStyle(DJS.ButtonStyle.Link)
                    .setURL('https://discord.com/channels/973711816226136095/1001724255215558766')
                    .setEmoji('🔗');

                row.addComponents(vortexMoreInfoButton);
            }

            levelUpChannel.send({
                content: silentUsers.includes(msg.author.id) ? null : `<@${msg.author.id}>`,
                embeds: [levelUpEmbed],
                components: [row]
            })
        })
})