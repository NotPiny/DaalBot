// JAVASCRIPT:
const warnSchema = require('../../models/gmute-schema');
const ac = require('../../autocomplete.json');
const { MessageEmbed } = require('discord.js')
const actions = ['give', 'remove', 'has']

module.exports = {
  category: "Pen",
  description: "pengmute",

  requireRoles: false,

  slash: true,
  testOnly: false,
  guildOnly: true,
  ownerOnly: true,

  // options: [
    // {
  //     name: 'action',
  //     description: `The action to perform. One of: ${actions.join(', ')}`,
  //     type: 'STRING',
  //     required: true,
  //     choices: actions.map((action) => ({
  //       name: action,
  //       value: action,
  //     })),
  //   },
  //   {
  //     name: 'user',
  //     description: 'The user to perform the action on',
  //     type: 'USER',
  //     required: true,
  //   },
  // ],

  callback: async ({ guild, member: staff, interaction }) => {
    return 'Command disabled'
  //   const action = args.shift()
  //   if (!action || !actions.includes(action)) {
  //     return `Unknown action! Please use one of the following: ${actions.join(
  //       ', '
  //     )}`
  //   }

  //   const memberId = args.shift().replace(/[<@!&>]/g, '')
  //   const roleId = args.shift().replace(/[<@!&>]/g, '')

  //   const member = guild.members.cache.get(memberId)
  },
}