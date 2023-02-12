const client = require('./client');
require('dotenv').config(); 
const path = require('path'); 
const WOKCommands = require('wokcommands'); 
const config = require('./config.json');
require('./launch-extra.js');
client.setMaxListeners(0); // Sets max client listeners to infinity

// Functions
function botLog(text) {
  client.channels.cache.find(channel => channel.id === config.Logchannel).send(text);
  console.log(text)
}

/* Here is the explanation for the code above:
1. client.channels.cache.find(channel => channel.id === config.Logchannel)
This line is finding the channel with the id of the config.Logchannel. The config.Logchannel is the channel ID of the channel that you want to log the bot messages in.

2. .send(text)
This is sending the text to the channel that was found in the first line. The text is the message that you want to send to the channel.

3. console.log(text)
This is sending the message to the console. The console is the part of the bot that you use to run the bot. If you want to see the messages in the console, you can use the command 'node .' in the console.
*/

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

client.login(process.env.TOKEN);