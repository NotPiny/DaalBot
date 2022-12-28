const client = require('../client'); require('dotenv').config(); const { LogIDs } = require('../config.json'); const fs = require('fs')

client.on('messageCreate', msg => {
    if (LogIDs.includes(msg.guild.id)) {
        console.log(`[${msg.guild}, ${msg.channel.name}] ${msg.author.tag}: ${msg.content} (Message ID: ${msg.id})`)
        
          fs.appendFile('./chat/all.chatlog', `[${TimeGB}, ${msg.guild}, ${msg.channel.name}] ${msg.author.tag}: ${msg.content} (Message ID: ${msg.id})\n`, function (err) {
            if (err) throw err;
          });
        
        if (msg.guildId === '975358046832304188') {
          fs.appendFile('./chat/supreme.chatlog', `[${TimeGB}, ${msg.guild}, ${msg.channel.name}] ${msg.author.tag}: ${msg.content} (Message ID: ${msg.id})\n`, function (err) {
            if (err) throw err;
          });
        }
        
        if (msg.guildId === '858790500605100062') {
        fs.appendFile('./chat/daal.chatlog', `[${TimeGB}, ${msg.guild}, ${msg.channel.name}] ${msg.author.tag}: ${msg.content} (Message ID: ${msg.id})\n`, function (err) {
          if (err) throw err;
              });
            }
        
        if (msg.guildId === '747728787797573656') {
          fs.appendFile('./chat/olilz.chatlog', `[${TimeGB}, ${msg.guild}, ${msg.channel.name}] ${msg.author.tag}: ${msg.content} (Message ID: ${msg.id})\n`, function (err) {
            if (err) throw err;
                });
        }
      
        if (msg.guildId === '929883659819962379') {
          fs.appendFile('./chat/adam.chatlog', `[${TimeGB}, ${msg.guild}, ${msg.channel.name}] ${msg.author.tag}: ${msg.content} (Message ID: ${msg.id})\n`, function (err) {
            if (err) throw err;
                });
        }
          }
})