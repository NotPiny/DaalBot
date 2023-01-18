//const stuff
const client = require('./client.js'); const config = require('./config.json'); const DJS = require('discord.js')
  function botLog(text) {
    client.channels.cache.find(channel => channel.id === config.Logchannel).send(text)
    console.log(text)
  }
const fs = require('fs')

client.on('rateLimit', () => {
  console.log('Info > Client rate limited')
});

client.on('guildCreate', guild => {
  const owner = client.users.cache.find(user => user.id === guild.ownerId);
  const embed = new DJS.MessageEmbed()
    .setTitle('Bot added to server')
    .setDescription(`Bot added to \`${guild.name}\` (${guild.id})`)
    .setThumbnail('https://pinymedia.web.app/daalbot/embed/thumbnail/logs/Guild.png')
    .setTimestamp()
    .setFooter({
      text: `Now in ${client.guilds.cache.size} servers`, iconURL: client.user.avatarURL()
    })
    .setColor('GREEN');

  client.channels.cache.find(channel => channel.id === config.Logchannel).send({
    embeds: [embed]
  });
})

client.on('guildDelete', guild => {
  const owner = client.users.cache.find(user => user.id === guild.ownerId);
  const embed = new DJS.MessageEmbed()
    .setTitle('Bot removed from server')
    .setDescription(`Bot removed from \`${guild.name}\` (${guild.id})`)
    .setThumbnail('https://pinymedia.web.app/daalbot/embed/thumbnail/logs/Guild.png')
    .setTimestamp()
    .setFooter({
      text: `Now in ${client.guilds.cache.size} servers`, iconURL: client.user.avatarURL()
    })
    .setColor('RED');

  client.channels.cache.find(channel => channel.id === config.Logchannel).send({
    embeds: [embed]
  });
})

// Stuff i guess (i just copied this from the discord.js server)
client.on('warn', console.log)

if (config.debug) {
  client.on('debug', data => {
    fs.appendFileSync(`./logs/debug.log`, `${data}\n`)
  })
}