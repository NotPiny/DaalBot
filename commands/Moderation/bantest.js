module.exports = {
    category: 'Moderation',
  description: 'Test version of ban command',

  // permissions: ['ADMINISTRATOR'],
//   requireRoles: true,

  slash: true,
  testOnly: true,
  ownerOnly: true,

  guildOnly: true,

  minArgs: 2,
  expectedArgs: '<user> <reason>',
  expectedArgsTypes: ['USER', 'STRING'],

  callback:  async ({ message, interaction, args }) => {
    return ':)'
  },
} 