//const stuff
const { Client, Intents, VoiceChannel, Message, MessageEmbed } = require('discord.js'); 
const client = new Client({
   intents: [
     Intents.FLAGS.GUILDS, 
     Intents.FLAGS.GUILD_MESSAGES, 
     Intents.FLAGS.GUILD_MESSAGE_REACTIONS, 
     Intents.FLAGS.GUILD_PRESENCES, 
     Intents.FLAGS.GUILD_BANS, 
     Intents.FLAGS.GUILD_MEMBERS, 
    ]
  }); require('dotenv').config(); const path = require('path'); WOKCommands = require('wokcommands'); const fs = require('fs'); const config = require('./config.json'); const prefix = config.prefix; const LogIDs = config.LogIDs; const activities = config.activities; const cmds = require('./cmds.js'); require('./daal.js')

client.on('ready', () => {
  //When bot loads
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('/Cmds to get started');
  console.log('Bot status has been set to "/Cmds to get started"');
  
  //WOKCommands
  new WOKCommands(client, {
    commandsDir: path.join(__dirname, 'commands'),
    
    typeScript: false,
    testServers: config.TestServers,
    botOwners: config.BotOwners,
    mongoUri: process.env.MONGO_URI,
  })

  // Status Changer
  setInterval(() => {
    // generate random number between 1 and list length.
    const randomIndex = Math.floor(Math.random() * (activities.length - 1) + 1);
    const newActivity = activities[randomIndex];

    client.user.setActivity(newActivity);
  }, 300000);
})

// Command Stuff :P
client.on("messageCreate", msg => {
  //Const stuff 2
  const command = `${prefix}${msg.content.toLowerCase()}`
  const SP = prefix;
  const channel = msg.channel;
  let FMT = msg.mentions.members.first();
  const deletImages = [
    'https://media.makeameme.org/created/delete-this-now-68a6f723c1.jpg',
    'https://i.kym-cdn.com/photos/images/original/001/462/418/021.png',
    'https://img-comment-fun.9cache.com/media/axg0gjW/aVlg2wlQ_700w_0.jpg',
    'https://pbs.twimg.com/media/DAt7DzTUQAA7y1i?format=jpg'
  ]
  const exampleEmbed = new MessageEmbed()
	.setColor('#9f14ba')
	.setTitle('DaalBot')
	.setURL('https://daalbot-a.web.app')
	.setAuthor({ name: 'DaalBot', iconURL: 'https://pinymedia.web.app/DaalBot.png', url: 'https://discord.js.org' })
	.setDescription('Some description here')
	.setThumbnail('https://pinymedia.web.app/DaalBot.png')
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.addField('Inline field title', 'Some value here', true)
	.setImage('https://pinymedia.web.app/DaalBot.png')
	.setTimestamp()
	.setFooter({ text: 'Some footer text here', iconURL: 'https://pinymedia.web.app/DaalBot.png' });
  //Log Msg
if (LogIDs.includes(msg.guild.id)) {
  console.log(`[${msg.guild}, ${msg.channel.name}] ${msg.author.tag}: ${msg.content} (Message ID: ${msg.id})`)
  
    fs.appendFile('./chat/all.txt', `[${msg.guild}, ${msg.channel.name}] ${msg.author.tag}: ${msg.content} (Message ID: ${msg.id})\n`, function (err) {
      if (err) throw err;
    });
  
  if (msg.guildId === '975358046832304188') {
    fs.appendFile('./chat/supreme.txt', `[${msg.guild}, ${msg.channel.name}] ${msg.author.tag}: ${msg.content} (Message ID: ${msg.id})\n`, function (err) {
      if (err) throw err;
    });
  }
  
  if (msg.guildId === '858790500605100062') {
  fs.appendFile('./chat/daal.txt', `[${msg.guild}, ${msg.channel.name}] ${msg.author.tag}: ${msg.content} (Message ID: ${msg.id})\n`, function (err) {
    if (err) throw err;
        });
      }
    }

    if (msg.author.bot) return

    // Delet This

    if (msg.content.toLowerCase().startsWith(`${prefix}delet`)) {
      const randomImage = Math.floor(Math.random() * (deletImages.length - 1) + 1);
      const Image = deletImages[randomImage];
      msg.channel.send(`<@${FMT.id}>`, {
      files: [Image]
      })
      if (msg.deletable) {
        msg.delete()
      }
    }

    // Revive

    if (msg.content.toLowerCase().startsWith(`${prefix}revive`)) {
      if (FMT.id === '965270659515183206') {
        msg.channel.send(`🧟 <@${msg.author.id}> revives <@${FMT.id}>\n(Thank You)`)
      } else {
        if (FMT.id === msg.author.id) {
          msg.channel.send(`You can't revive yourself.`)
        } else {
      msg.channel.send(`🧟 <@${msg.author.id}> revives <@${FMT.id}>`)
    }
  }
}

    // Kill

    if (msg.content.toLowerCase().startsWith(`${prefix}kill`)) {
      msg.channel.send(`🔪<@${msg.author.id}> kills <@${FMT.id}>`)
      .catch(console.log('A error has happened in the Kill command.'))
    }

    // Heart

    if (msg.content.toLowerCase().startsWith(`${prefix}heart`)) {
      if (!FMT.id) { msg.reply('Please tag a valid user.'); return }
      msg.react('996855409929375845')
      if (FMT.id === '965270659515183206') {
        msg.channel.send(`<:wumplove:996855409929375845> <@${msg.author.id}> sends a heart to <@${FMT.id}>\nHere have one back <:wumplove:996855409929375845>`)
      } else {
        if (FMT.id === msg.author.id) {
          msg.channel.send(`<:wumplove:996855409929375845> <@${msg.author.id}> sends a heart to themself`)
        } else {
      msg.channel.send(`<:wumplove:996855409929375845> <@${msg.author.id}> sends a heart to <@${FMT.id}>`)
    }
  }
}

    // Game

    if (msg.content.toLowerCase().startsWith(`${prefix}game`)) {
      if (msg.content.toLowerCase() === `${prefix}game`) {
        msg.reply(`Please pick a game\n\nOptions:\n\`snake\``) 
      }
      if (msg.content.toLowerCase().startsWith(`${prefix}game snake`)) {
        msg.reply('this game has not been set up yet')
      }
    }
    
    // Poll
    
      if (msg.content.toLowerCase().includes('poll')) {
        msg. react('✅')
        msg.react('❌')
        msg.react('➖')
      } 
    
    // :P
    
      if (msg.content.toLowerCase().endsWith(":p")) {
        msg.channel.send(":P")
        console.log(msg.author.tag + ' used :P')
      }
    
    // Don't quote me on this
    
      if (msg.content.toLowerCase().endsWith("don't quote me on this")) {
        msg.channel.send(`${msg.content} \n-${msg.author.username} ${currentYear}`)
        console.log(msg.author.username + 'activated "Don\'t quote me"')
      }

      // Delay

      if (msg.content.toLowerCase().startsWith(`${prefix}delay`)) {
        msg.reply('Pinging <a:typing:976598236561289256>')
        .then((message) => {
        message.edit({
          content: `${Date.now() - msg.createdTimestamp}ms`, 
        })
        });
      }

      // Embed Test

      if (msg.content.toLowerCase().startsWith(`${prefix}embed`)) {
        const Embed = new MessageEmbed()
	.setColor('#9f14ba')
	.setTitle('Pong!')
	.setDescription(`${Date.now() - msg.createdTimestamp}ms`)
        msg.reply({ embeds: [Embed] })
      }
})

client.login(process.env.TOKEN)