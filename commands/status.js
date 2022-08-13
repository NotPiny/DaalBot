module.exports = {
  category: 'Piny Only',
  description: 'Sets the bots status',

  minArgs: 1,
  maxArgs: 2,
  expectedArgs: '<status> <username>',
  expectedArgsTypes: ['STRING', 'STRING'],

  options: [
    {
      name: 'status',
      description: 'The text to set the bot status to',
      type: 'STRING',
      required: true,
    },
    {
      name: 'username',
      description: 'The twitch username to link to',
      type: 'STRING',
      required: false,
    },
  ],

  slash: true,
  testOnly: false,

  ownerOnly: true,

  callback: ({ message, client, text, interaction }) => {
    // Brings strings from options
    const NS = interaction.options.getString('status')
    const name = interaction.options.getString('username')
    
    if (!NS === null) {
      client.user?.setActivity(NS, {
        type: "STREAMING",
        url: `https://www.twitch.tv/${name}`
        });
    } else {
    client.user?.setActivity(NS, {
      type: "STREAMING",
      url: "https://www.twitch.tv/daalbott"
      });
    }

    return `Status has been changed to \`${NS}\``
  },
}
