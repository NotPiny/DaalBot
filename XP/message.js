const XPamount = Math.floor(Math.random() * 10) + 1;
const client = require('../client.js');
const config = require('../config.json');
const daalbot = require('../daalbot.js');
const fs = require('fs');
const path = require('path');

client.on('messageCreate', msg => {
    if (msg.author.bot) return;
    if (msg.content.startsWith(['!', '$', '.'])) return;
    
    const GuildXpFolder = path.resolve(`./db/xp/${msg.guild.id}`);
    const MemberXpFile = path.resolve(`./db/xp/${msg.guild.id}/${msg.author.id}.xp`);

    if (!fs.existsSync(GuildXpFolder)) {
        fs.mkdirSync(GuildXpFolder);
    }

    const newXp = fs.existsSync(MemberXpFile) ? `${parseInt(fs.readFileSync(MemberXpFile)) + XPamount}` : `${XPamount}`;

    daalbot.fs.write(MemberXpFile, newXp);

    // if (msg.guild.id ==  config.servers.vortex.id) {
    //     const level = parseInt(newXp.slice(0, -3)) || 0;

    //     if (level == 0) return;

    //     const levelObj = config.servers.vortex.roles.levels.find(obj => obj.level == level);
    //     if (!levelObj || levelObj.level == undefined) return;

    // }
})