const XPamount = 1;
const client = require('../client.js');
const fs = require('fs');
const config = require('../config.json');
function addXP(server, user) {
    console.log(`XP > Adding XP to ${user} in ${server}`)
    try {
        if (fs.existsSync(`../db/xp/${server}`)) {
            if (fs.existsSync(`../db/xp/${server}/${user}.xp`)) {
                let xp = fs.readFileSync(`../db/xp/${server}/${user}.xp`, 'utf8');
                xp = parseInt(xp) + XPamount;
                fs.writeFileSync(`../db/xp/${server}/${user}.xp`, xp);
            } else {
                fs.mkdirSync(`../db/xp/${server}`, { recursive: true });
                let xp = "0";
                xp = parseInt(xp) + XPamount;
                fs.appendFileSync(`../db/xp/${server}/${user}.xp`, xp);
            }
        }
} catch (err) {
    console.log(err);
}
}

client.on('messageCreate', msg => {
    if (msg.author.bot) return;
    if (msg.content.startsWith(['!', '$'])) return;
    addXP(msg.guild.id, msg.author.id);
})