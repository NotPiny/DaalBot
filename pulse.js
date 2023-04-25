const execSync = require('child_process').execSync;
const DJS = require('discord.js');
const config = require('./config.json');
require('dotenv').config();

const port = 7284 || process.env.PORT;

const check = () => {
    try {
        /**
         * Check if the server is running because if the server is not running it means that the main process is not running anymore
         * 
         * (If you find a better way to do this or find a bug please let me know: Piny#1000)
         */
        const response = execSync(`curl http://localhost:${port}/daalbot/heartbeat`).toString();
        if (response.includes('I am alive')) {
            if (config.debug) {
                console.log(`Pulse > Server is running, everything is fine`);
            }
        }
    } catch {
        const client = require('./client.js');

        client.on('ready', () => {
            const downtimeSpamChannel = client.guilds.cache.find(g => g.id == '1017715574639431680').channels.cache.find(c => c.id == '1055850400898617408')
            
            if (downtimeSpamChannel == undefined) {
                console.log(`Pulse > Channel not found`);
                return;
            } else if (downtimeSpamChannel.isText()) {
                for (let i = 0; i < 3; i++) {
                    setTimeout(() => {
                        downtimeSpamChannel.send({
                            content: `<@900126154881646634> I am dead, please start me again`
                        });
                    }, 1000 * 2);
                }
            }
            client.destroy();
        });

        client.login(process.env.TOKEN);
    }
}

// setInterval(check, 1000 * 60 * 30); // Checks every 30 minutes