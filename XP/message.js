const client = require('../client.js');
const config = require('../config.json');
const daalbot = require('../daalbot.js');
const fs = require('fs');
const path = require('path');

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

    if (msg.guild.id ==  config.servers.vortex.id) {
        const level = parseInt(newXp.slice(0, -3)) || 0;

        if (level == 0) return;

        const levelObj = config.servers.vortex.roles.levels.find(obj => obj.level == level);
        if (!levelObj || levelObj.level == undefined) return;

        const role = daalbot.getRole(msg.guild.id, levelObj.role);

        if (role == undefined || role == 'Role not found.' || role == 'Server not found.') return;

        if (msg.member.roles.cache.has(role.id)) return;

        msg.member.roles.add(role.id)
            .then(() => {
                const botCmdsChannel = msg.guild.channels.cache.get(config.servers.vortex.channels.botCmds);

                if (!botCmdsChannel.isText()) return;

                botCmdsChannel.send({
                    content: `Congratulations <@${msg.author.id}>, you have reached level ${level} and have earned the ${level} role! Check out <#1001724255215558766> for more information`,
                })
                .catch(err => {
                    console.log(err);
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
})