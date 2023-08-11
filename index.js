const client = require('./client');
require('dotenv').config(); 
const path = require('path'); 
const WOKCommands = require('wokcommands'); 
const config = require('./config.json');
require('./launch-extra.js');
client.setMaxListeners(0); // Sets max client listeners to infinity
const fs = require('fs'); // File system
const { MessageEmbed } = require('discord.js'); // Embeds

// Functions
function OnReady() {
  const loggingChannel = client.channels.cache.find(channel => channel.id === '1138413163319132231')
  console.log('Load > DaalBot is ready')

  const embed = new MessageEmbed()
    .setTitle('Bot Ready')
    .setDescription('Load > DaalBot is ready')
    .setColor('GREEN')
    .setTimestamp()

  loggingChannel.send({
    embeds: [embed]
  })
}

client.on('ready', () => {
  //When bot loads
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

  OnReady();
})

// DB check
if (!fs.existsSync(`./db/`)) {
  require('./db-setup.js') // If the database doesn't exist, run the setup
}

client.login(process.env.TOKEN);