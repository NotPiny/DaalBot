const execSync = require('child_process').execSync;
const config = require('./config.json');
require('dotenv').config();
let crashedLastTime = false;
const interval = 30; // In seconds

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
            crashedLastTime = false;
        }
    } catch {
        const client = require('./client.js');

        if (crashedLastTime) {
            return
        } else {
            crashedLastTime = true;
        }

        client.on('ready', () => {
            const downtimeSpamChannel = client.guilds.cache.find(g => g.id == '1017715574639431680').channels.cache.find(c => c.id == '1055850400898617408')
            
            if (downtimeSpamChannel == undefined) {
                console.log(`Pulse > Channel not found`);
                return;
            } else if (downtimeSpamChannel.isText()) {
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        downtimeSpamChannel.send({
                            content: `<@900126154881646634> I am dead, please start me again`
                        });
                    }, 1000 * 1);
                }
            }

            const statusUpdateChannel = client.guilds.cache.find(g => g.id == '1001929445478781030').channels.cache.find(c => c.id == '1004171003355746364')

            if (statusUpdateChannel == undefined) return console.log(`Pulse > Channel not found`);

            if (statusUpdateChannel.isText()) {
                const DJS = require('discord.js');
                const embed = new DJS.MessageEmbed()
                    .setTitle(`Bot offline`)
                    .setDescription(`The bot does not seem to be responding please wait for the bot to be restarted`)
                    .setColor(`RED`)
                    .setAuthor({
                        name: `Status update`,
                        iconURL: client.user.displayAvatarURL()
                    })
                    .setTimestamp();

                const row = new DJS.MessageActionRow()
                    .addComponents(
                        new DJS.MessageButton()
                            .setCustomId('testPingButtonStatusUpdate')
                            .setLabel('Test')
                            .setStyle('SUCCESS')
                    )

                statusUpdateChannel.send({
                    content: `<@&1056191599652126792>`,
                    embeds: [embed],
                    components: [row]
                })
            }
        });

        client.login(process.env.TOKEN);
    }
}

setInterval(check, 1000 * interval); // Checks every 5 seconds