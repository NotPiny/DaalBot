const client = require('./client');
require('dotenv').config(); 
const path = require('path'); 
const WOKCommands = require('wokcommands'); 
const config = require('./config.json');
require('./launch-extra.js');
client.setMaxListeners(0); // Sets max client listeners to infinity
const fs = require('fs'); // File system

// Functions
function botLog(text) {
  client.channels.cache.find(channel => channel.id === config.Logchannel).send(text);
  console.log(text)
}

client.on('ready', () => {
  //When bot loads
  botLog(`Load > DaalBot is ready`);
  console.log(`Running in ${client.guilds.cache.size} servers!`);
  const RandomIndex = Math.floor(Math.random() * (config.activities.length - 1) + 1);
  const NewActivity = config.activities[RandomIndex];

    client.user.setActivity(NewActivity, {
      type: "STREAMING",
      url: "https://www.twitch.tv/daalbott"
    });
    console.log(`Status > Status is now "${NewActivity}"`)
  
  // WOKCommands
  new WOKCommands(client, {
    commandsDir: path.join(__dirname, 'commands'),
    featuresDir: path.join(__dirname, 'features'),
    typeScript: false,
    testServers: config.WOKCommands.TestServers,
    botOwners: config.WOKCommands.BotOwners,
    mongoUri: process.env.MONGO_URI,
  })
  .setDefaultPrefix(config.WOKCommands.prefix)

  // Backup custom handler for if WOKCommands fails
  require('./handler/exe.js');
})

// DB check
if (!fs.existsSync(`./db/`)) {
  require('./db-setup.js') // If the database doesn't exist, run the setup
}

client.login(process.env.TOKEN);