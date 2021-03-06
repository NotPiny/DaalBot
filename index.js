//const stuff
const { Client, Intents, VoiceChannel, Message, MessageEmbed, MessageAttachment } = require('discord.js'); 
const client = new Client({
   intents: [
     Intents.FLAGS.GUILDS, 
     Intents.FLAGS.GUILD_MESSAGES, 
     Intents.FLAGS.GUILD_MESSAGE_REACTIONS, 
     Intents.FLAGS.GUILD_PRESENCES, 
     Intents.FLAGS.GUILD_BANS, 
     Intents.FLAGS.GUILD_MEMBERS, 
    ]
  }); require('dotenv').config(); const path = require('path'); WOKCommands = require('wokcommands'); const fs = require('fs'); const config = require('./config.json'); const prefix = config.prefix; const LogIDs = config.LogIDs; const activities = config.activities; require('./daal.js'); require('./olilz.js')

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
  }, 3600000);
})

// Command Stuff :P
client.on("messageCreate", msg => {
  //Const stuff 2
  const command = `${prefix}${msg.content.toLowerCase()}`
  const SP = prefix;
  const channel = msg.channel;
  const FMT = msg.mentions.members.first();
  const deletImages = [
    'https://media.makeameme.org/created/delete-this-now-68a6f723c1.jpg',
    'https://i.kym-cdn.com/photos/images/original/001/462/418/021.png',
    'https://img-comment-fun.9cache.com/media/axg0gjW/aVlg2wlQ_700w_0.jpg',
    'https://pbs.twimg.com/media/DAt7DzTUQAA7y1i.jpg'
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

    // if (msg.content.toLowerCase().startsWith(`${prefix}delet`)) {
    //   const randomImage = Math.floor(Math.random() * deletImages.length);
    //   const Image = deletImages[randomImage];
    //   const sendIMG = new MessageAttachment(`${Image}`)
    //   msg.channel.send(`<@${FMT.id}>`, sendIMG)
    //   if (msg.deletable) {
    //     msg.delete()
    //   }
    // }

    // Revive

    if (msg.content.toLowerCase().startsWith(`${prefix}revive`)) {
      const cmdname = `revive`
      if (FMT.id === '965270659515183206') {
        msg.channel.send(`???? <@${msg.author.id}> revives <@${FMT.id}>\n(Thank You)`)
      } else {
        if (FMT.id === msg.author.id) {
          msg.channel.send(`You can't revive yourself.`)
        } else {
      msg.channel.send(`???? <@${msg.author.id}> revives <@${FMT.id}>`)
    }
  }
}

    // Kill

    if (msg.content.toLowerCase().startsWith(`\n${prefix}kill`)) {
      const cmdname = `kill`
      if (FMT.id === '996855409929375845') {
        msg.channel.send('You can\'t kill me i am immortal')
        .catch(console.log('A error has happened in the Kill command.'))
      } else {
      msg.channel.send(`????<@${msg.author.id}> kills <@${FMT.id}>`)
      .catch(console.log('A error has happened in the Kill command.'))
    }
  }

    // Heart

    if (msg.content.toLowerCase().startsWith(`\n${prefix}heart`)) {
      const cmdname = `heart`
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

    // Option picker

    if (msg.content.toLowerCase() === `trivia`) {
      try {
        const data = fs.readFileSync('./game/datastore/1.txt', 'utf8');
        console.log(data);
        if (data.includes('ISM: true')) {
          const Atrivia = [
            './game/trivia/1.json',
            './game/trivia/2.json',
            './game/trivia/3.json',
          ]
          const randomIndex = Math.floor(Math.random() * Atrivia.length);
          const trivia = require(`${Atrivia[randomIndex]}`);
          msg.channel.send(`Welcome to trivia!\nThe game will start in \`10\` seconds\nYou will have 15 seconds for each question`)
          .then((message) => {
            setTimeout(() => message.edit(`Welcome to trivia!\nThe game will start in \`9\` seconds\nYou will have 15 seconds for each question`), 1000);
            setTimeout(() => message.edit(`Welcome to trivia!\nThe game will start in \`8\` seconds\nYou will have 15 seconds for each question`), 2000);
            setTimeout(() => message.edit(`Welcome to trivia!\nThe game will start in \`7\` seconds\nYou will have 15 seconds for each question`), 3000);
            setTimeout(() => message.edit(`Welcome to trivia!\nThe game will start in \`6\` seconds\nYou will have 15 seconds for each question`), 4000);
            setTimeout(() => message.edit(`Welcome to trivia!\nThe game will start in \`5\` seconds\nYou will have 15 seconds for each question`), 5000);
            setTimeout(() => message.edit(`Welcome to trivia!\nThe game will start in \`4\` seconds\nYou will have 15 seconds for each question`), 6000);
            setTimeout(() => message.edit(`Welcome to trivia!\nThe game will start in \`3\` seconds\nYou will have 15 seconds for each question`), 7000);
            setTimeout(() => message.edit(`Welcome to trivia!\nThe game will start in \`2\` seconds\nYou will have 15 seconds for each question`), 8000);
            setTimeout(() => message.edit(`Welcome to trivia!\nThe game will start in \`1\` second\nYou will have 15 seconds for each question`), 9000);
            setTimeout(() => message.edit(`Question 1: ${trivia.Q1}\nYou have 15 seconds`), 10000);
            setTimeout(() => message.channel.send(`\nThe answer was ${trivia.A1}\nNext question in 5 seconds\n`), 25000);
            setTimeout(() => message.channel.send(`Question 2: ${trivia.Q2}`), 30000);
            setTimeout(() => message.channel.send(`\nThe answer was ${trivia.A2}\nNext question in 5 seconds\n`), 45000);
            setTimeout(() => message.channel.send(`Question 3: ${trivia.Q3}`), 50000);
            setTimeout(() => message.channel.send(`\nThe answer was ${trivia.A3}\nNext question in 5 seconds\n`), 65000);
            setTimeout(() => message.channel.send(`Question 4: ${trivia.Q4}`), 70000);
            setTimeout(() => message.channel.send(`\nThe answer was ${trivia.A4}\nNext question in 5 seconds\n`), 85000);
            setTimeout(() => message.channel.send(`Question 5: ${trivia.Q5}`), 90000);
            setTimeout(() => message.channel.send(`\nThe answer was ${trivia.A5}\nNext question in 5 seconds\n`), 105000);
            setTimeout(() => message.channel.send(`Question 6: ${trivia.Q6}`), 110000);
            setTimeout(() => message.channel.send(`\nThe answer was ${trivia.A6}\nNext question in 5 seconds\n`), 125000);
            setTimeout(() => message.channel.send(`Question 7: ${trivia.Q7}`), 130000);
            setTimeout(() => message.channel.send(`\nThe answer was ${trivia.A7}\nNext question in 5 seconds\n`), 145000);
            setTimeout(() => message.channel.send(`Question 8: ${trivia.Q8}`), 150000);
            setTimeout(() => message.channel.send(`\nThe answer was ${trivia.A8}\nNext question in 5 seconds\n`), 165000);
            setTimeout(() => message.channel.send(`Question 9: ${trivia.Q9}`), 170000);
            setTimeout(() => message.channel.send(`\nThe answer was ${trivia.A9}\nNext question in 5 seconds\n`), 185000);
            setTimeout(() => message.channel.send(`Question 10: ${trivia.Q10}`), 190000);
            setTimeout(() => message.channel.send(`\nThe answer was ${trivia.A10}\nGame ends in in 5 seconds\n`), 205000);
          })
        }
      } catch (err) {
        console.error(err);
      }      
    }

    // Game

    if (msg.content.toLowerCase().startsWith(`${prefix}game`)) {
      const cmdname = `game`
      if (msg.content.toLowerCase() === `${prefix}game`) {
        msg.reply(`Please pick a game\n\nOptions:\n\`trivia\``) 
      }

      // Trivia
      if (msg.content.toLowerCase().startsWith(`${prefix}game trivia`) || msg.content.toLowerCase() === `trivia`) {
        const Atrivia = [
          './game/trivia/1.json',
          './game/trivia/2.json',
          './game/trivia/3.json',
        ]
        const randomIndex = Math.floor(Math.random() * Atrivia.length);
        const trivia = require(`${Atrivia[randomIndex]}`);
        msg.channel.send(`Welcome to trivia!\nThe game will start in \`10\` seconds\nYou will have 15 seconds for each question`)
        .then((message) => {
          setTimeout(() => message.edit(`Welcome to trivia!\nThe game will start in \`9\` seconds\nYou will have 15 seconds for each question`), 1000);
          setTimeout(() => message.edit(`Welcome to trivia!\nThe game will start in \`8\` seconds\nYou will have 15 seconds for each question`), 2000);
          setTimeout(() => message.edit(`Welcome to trivia!\nThe game will start in \`7\` seconds\nYou will have 15 seconds for each question`), 3000);
          setTimeout(() => message.edit(`Welcome to trivia!\nThe game will start in \`6\` seconds\nYou will have 15 seconds for each question`), 4000);
          setTimeout(() => message.edit(`Welcome to trivia!\nThe game will start in \`5\` seconds\nYou will have 15 seconds for each question`), 5000);
          setTimeout(() => message.edit(`Welcome to trivia!\nThe game will start in \`4\` seconds\nYou will have 15 seconds for each question`), 6000);
          setTimeout(() => message.edit(`Welcome to trivia!\nThe game will start in \`3\` seconds\nYou will have 15 seconds for each question`), 7000);
          setTimeout(() => message.edit(`Welcome to trivia!\nThe game will start in \`2\` seconds\nYou will have 15 seconds for each question`), 8000);
          setTimeout(() => message.edit(`Welcome to trivia!\nThe game will start in \`1\` second\nYou will have 15 seconds for each question`), 9000);
          setTimeout(() => message.edit(`Question 1: ${trivia.Q1}\nYou have 15 seconds`), 10000);
          setTimeout(() => message.channel.send(`\nThe answer was ${trivia.A1}\nNext question in 5 seconds\n`), 25000);
          setTimeout(() => message.channel.send(`Question 2: ${trivia.Q2}`), 30000);
          setTimeout(() => message.channel.send(`\nThe answer was ${trivia.A2}\nNext question in 5 seconds\n`), 45000);
          setTimeout(() => message.channel.send(`Question 3: ${trivia.Q3}`), 50000);
          setTimeout(() => message.channel.send(`\nThe answer was ${trivia.A3}\nNext question in 5 seconds\n`), 65000);
          setTimeout(() => message.channel.send(`Question 4: ${trivia.Q4}`), 70000);
          setTimeout(() => message.channel.send(`\nThe answer was ${trivia.A4}\nNext question in 5 seconds\n`), 85000);
          setTimeout(() => message.channel.send(`Question 5: ${trivia.Q5}`), 90000);
          setTimeout(() => message.channel.send(`\nThe answer was ${trivia.A5}\nNext question in 5 seconds\n`), 105000);
          setTimeout(() => message.channel.send(`Question 6: ${trivia.Q6}`), 110000);
          setTimeout(() => message.channel.send(`\nThe answer was ${trivia.A6}\nNext question in 5 seconds\n`), 125000);
          setTimeout(() => message.channel.send(`Question 7: ${trivia.Q7}`), 130000);
          setTimeout(() => message.channel.send(`\nThe answer was ${trivia.A7}\nNext question in 5 seconds\n`), 145000);
          setTimeout(() => message.channel.send(`Question 8: ${trivia.Q8}`), 150000);
          setTimeout(() => message.channel.send(`\nThe answer was ${trivia.A8}\nNext question in 5 seconds\n`), 165000);
          setTimeout(() => message.channel.send(`Question 9: ${trivia.Q9}`), 170000);
          setTimeout(() => message.channel.send(`\nThe answer was ${trivia.A9}\nNext question in 5 seconds\n`), 185000);
          setTimeout(() => message.channel.send(`Question 10: ${trivia.Q10}`), 190000);
          setTimeout(() => message.channel.send(`\nThe answer was ${trivia.A10}\nGame ends in in 5 seconds\n`), 205000);
        })
      }
    }
    
    // Poll
    
      if (msg.content.toLowerCase().includes('poll')) {
        const cmdname = `poll`
        msg.react('???')
        msg.react('???')
        msg.react('???')
      } 
    
    // :P
    
      if (msg.content.toLowerCase().endsWith(":p")) {
        const cmdname = `:P`
        msg.channel.send(":P")
        console.log(msg.author.tag + ' used :P')
      }
    
    // Don't quote me on this
    
      if (msg.content.toLowerCase().endsWith("don't quote me on this")) {
        const cmdname = `don't quote me on this`
        msg.channel.send(`${msg.content} \n-${msg.author.username} ${currentYear}`)
        console.log(msg.author.username + 'activated "Don\'t quote me"')
      }

      // Delay

      if (msg.content.toLowerCase().startsWith(`${prefix}delay`)) {
        const cmdname = `delay`
        msg.reply('Pinging <a:typing:976598236561289256>')
        .then((message) => {
        message.edit({
          content: `${Date.now() - msg.createdTimestamp}ms`, 
        })
        });
      }
      // fs.appendFile('./command-log.txt', `${msg.author.tag} has ran ${prefix}${cmdname} in ${msg.channel.name} in ${msg.guild.name}`, function (err) { if (err) throw err; })
  })

client.login(process.env.TOKEN)