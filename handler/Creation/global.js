const client = require('../../client'); require('dotenv').config(); const DiscordJS = require('discord.js')

client.on('ready', () => {
  const options = DiscordJS.Constants.ApplicationCommandOptionTypes
  const guildId = ''
  const guild = client.guilds.cache.get(guildId)
  let commands

  if (guild) {
    commands = guild.commands
  } else {
    commands = client.application?.commands
  }

  // commands?.create({
  //   name: 'ping',
  //   description: 'Replies with pong.',
  // })
})