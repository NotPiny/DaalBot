const client = require('../client');
const fs = require('fs');
const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
require('dotenv/config');

const question = async(q) => new Promise((resolve) => rl.question(q, resolve));

(async() => {
    const mode = await question('Mode (guild, threshold): ');

    if (![ 'guild', 'threshold' ].includes(mode)) {
        console.log('Invalid mode');
        process.exit(1);
    }

    if (mode === 'guild') {
        const guild = await question('Guild ID: ');

        for (let i = 0; i < 100; i++) {
            console.log('|-|-|-|-|-|-|-|-|-|-|-|');
        }

        const path = `../db/xp/${guild}`;

        fs.readdirSync(path).forEach(file => {
            const user = client.users.cache.get(file.split('.')[0]);

            const xp = parseInt(fs.readFileSync(`${path}/${file}`, 'utf8'));

            if (user !== undefined) {
                console.log(`${user.tag}: ${xp}`);
            } else {
                console.log(`${file.split('.')[0]}: ${xp}`);
            }
        })
    } else if (mode === 'threshold') {
        const threshold = parseInt(await question('Threshold: '));

        for (let i = 0; i < 100; i++) {
            console.log('|-|-|-|-|-|-|-|-|-|-|-|');
        }

        const path = `../db/xp`;

        fs.readdirSync(path).forEach(guild => {
            const guildPath = `${path}/${guild}`;

            try {
                console.log(`\n---Guild: ${client.guilds.cache.get(guild).name}---\n`);
            } catch {
                console.log(`\n---Guild: ${guild}---\n`);
            }
            fs.readdirSync(guildPath).forEach(file => {
                const userId = file.split('.')[0]

                const xp = parseInt(fs.readFileSync(`${guildPath}/${file}`, 'utf8'));

                if (xp >= threshold) {
                    const user = client.users.cache.get(userId);

                    if (user !== undefined) {
                        console.log(`${user.tag}: ${xp}`);
                    } else {
                        console.log(`${userId}: ${xp}`);
                    }
                }
            });
        });
    }
})();

client.login(process.env.TOKEN);