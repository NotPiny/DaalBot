const XPamount = 15;
const client = require('../client.js');
const daalbot = require('../daalbot.js');
const fs = require('fs');
const path = require('path');
const { WOKCommands } = require('../config.json');

client.on('messageCreate', msg => {
    if (msg.author.bot) return;
    if (msg.content.startsWith(['!', '$', '.'])) return;
    
    const GuildXpFolder = path.resolve(`./db/xp/${msg.guild.id}`);
    const MemberXpFile = path.resolve(`./db/xp/${msg.guild.id}/${msg.author.id}.xp`);

    if (!fs.existsSync(GuildXpFolder)) {
        fs.mkdirSync(GuildXpFolder);
    }

    daalbot.fs.write(MemberXpFile, fs.existsSync(MemberXpFile) ? `${parseInt(fs.readFileSync(MemberXpFile)) + XPamount}` : `${XPamount}`);
})