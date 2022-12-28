const config = require('../../config.json')
module.exports = {
  category: 'Pen',
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
    function botLog(text) {
        client.channels?.cache.find(channel => channel.id === config.Logchannel).send(text)
        console.log(text)
      }
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

    botLog(`Status > Status is now \`${NS}\``)
    return `Status has been changed to \`${NS}\``
    
    
  },
}
