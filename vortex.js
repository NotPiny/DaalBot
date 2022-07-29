// //const stuff
// const { REST } = require('@discordjs/rest')
// const { Client, Intents, VoiceChannel, Message, Routes, SlashCommandBuilder } = require('discord.js'); 
// const client = new Client({
//    intents: [
//      Intents.FLAGS.GUILDS, 
//      Intents.FLAGS.GUILD_MESSAGES, 
//      Intents.FLAGS.GUILD_MESSAGE_REACTIONS, 
//      Intents.FLAGS.GUILD_PRESENCES, 
//      Intents.FLAGS.GUILD_BANS, 
//      Intents.FLAGS.GUILD_MEMBERS, 
//     ]
//   }); require('dotenv').config(); const path = require('path'); WOKCommands = require('wokcommands'); const fs = require('fs'); const config = require('./config.json'); const prefix = config.prefix; const LogIDs = config.LogIDs; const activities = config.activities;
// // Command Stuff :P

// const commands = [];
// const commandFiles = fs.readdirSync('./custom/commands/vortex').filter(file => file.endsWith('.js'));

// const clientId = '965270659515183206';
// const guildId = '973711816226136095';

// for (const file of commandFiles) {
// 	const command = require(`./customs/commands/vortex/${file}`);
// 	commands.push(command.data.toJSON());
// }

// const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

// (async () => {
// 	try {
// 		console.log('Vortex > Started refreshing application (/) commands.');

// 		await rest.put(
// 			Routes.applicationGuildCommands(clientId, guildId),
// 			{ body: commands },
// 		);

// 		console.log('Vortex > Successfully reloaded application (/) commands.');
// 	} catch (error) {
// 		console.error(error);
// 	}
// })();

// const skraping = new SlashCommandBuilder()
// 	.setName('skraping')
// 	.setDescription('Pings skra pow')

//     client.on('interactionCreate', async interaction => {
//         if (!interaction.isChatInputCommand()) return;
    
//         if (interaction.commandName === 'skraping') {
//             await interaction.reply('<@566449961319792681>');
//         }
//     });

// // client.on("messageCreate", msg => {
// //     if (!msg.guild.id === '973711816226136095') { 
// //       return 
// //     } else {
// //     if (msg.author.bot) return

// //     if(msg.content.toLowerCase().startsWith(`${prefix}skraping`)) {
// //         msg.channel.send(`<@566449961319792681>`)
// //     }
// //   }
// // })

// client.login(process.env.TOKEN)