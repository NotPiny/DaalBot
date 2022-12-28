//const stuff
const { Client, Intents, VoiceChannel, Message } = require('discord.js'); 
const client = new Client({
   intents: [
     Intents.FLAGS.GUILDS, 
     Intents.FLAGS.GUILD_MESSAGES, 
    ]
  }); require('dotenv').config(); const path = require('path'); WOKCommands = require('wokcommands'); const fs = require('fs'); const config = require('../config.json'); const prefix = config.prefix; const LogIDs = config.LogIDs; const activities = config.activities;
// Command Stuff :P
client.on("messageCreate", msg => {
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
})