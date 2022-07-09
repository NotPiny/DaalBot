const Discord = require('discord.js')
const { Client, Intents, VoiceChannel, Message } = require('discord.js')
const client = new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
      Intents.FLAGS.GUILD_PRESENCES,
      Intents.FLAGS.GUILD_BANS,
      Intents.FLAGS.GUILD_MEMBERS,
    ],
  });
const config = require('./config.json')
const prefix = config.prefix;
const dotenv = require('dotenv/config')
 
const fs = require('fs');
 
client.commands = new Discord.Collection();
 
const commandFiles = fs.readdirSync('./cmds/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./cmds/${file}`);
 
    client.commands.set(command.name, command);
}
 
client.on('messageCreate', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
 
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
 
    if(command.startsWith('ping')){
        client.commands.get('ping').execute(message, args);
    }
});
 
client.login(process.env.TOKEN);