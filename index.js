const client = require('./client'); 
require('./legacy/launch.js'); 
require('./superLog.js'); 
require('dotenv').config(); 
const path = require('path'); 
const WOKCommands = require('wokcommands'); 
const config = require('./config.json');
require('./daal.js'); 
require('./localhost/launch');

// Functions
function botLog(text) {
  client.channels.cache.find(channel => channel.id === config.Logchannel).send(text);
  console.log(text)
}

client.on('ready', () => {
  //When bot loads
  botLog(`Load > Logged in as ${client.user.tag}!`);
  const RandomIndex = Math.floor(Math.random() * (config.activities.length - 1) + 1);
  const NewActivity = config.activities[RandomIndex];

    client.user.setActivity(NewActivity, {
    type: "STREAMING",
    url: "https://www.twitch.tv/daalbott"
    });
    botLog(`Status > Status is now "${NewActivity}"`)
  
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

  // Custom Loader
  // require('./handler/exe.js');
})

client.login(process.env.TOKEN)