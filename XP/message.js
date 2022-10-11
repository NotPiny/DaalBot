const XPamount = 15;
const client = require('../client.js');
const fs = require('fs');
const botPath = '..';

client.on('messageCreate', msg => {
    if (msg.author.bot) return;
    if (msg.content.startsWith(['!', '$', '.'])) return;
    try {
        if (fs.existsSync(`${botPath}/db/xp/${msg.guild.id}`)) {
            if (fs.existsSync(`${botPath}/db/xp/${msg.guild.id}/${msg.author.id}.xp`)) {
                let xp = fs.readFileSync(`${botPath}/db/xp/${msg.guildId}/${msg.author.id}.xp`, 'utf8');
                const oldXp = xp;
                xp = parseInt(xp) + XPamount;
                fs.writeFileSync(`${botPath}/db/xp/${msg.guildId}/${msg.author.id}.xp`, xp.toString());
            } else {
                let xp = "0";
                const oldxp = fs.readFileSync(`${botPath}/db/xp/${msg.guildId}/${msg.author.id}.xp`, 'utf8');
                xp = parseInt(xp) + XPamount;
                fs.appendFileSync(`${botPath}/db/xp/${msg.guildId}/${msg.author.id}.xp`, xp.toString());
            }
        } else {
            fs.mkdirSync(`${botPath}/db/xp/${msg.guild.id}`, { recursive: true });
            let xp = "0";
            xp = parseInt(xp) + XPamount;
            fs.appendFileSync(`${botPath}/db/xp/${msg.guildId}/${msg.author.id}.xp`, xp.toString());
        }
} catch (err) {
    return;
}
})