module.exports = {
  category: 'Configuration',
  description: 'Sets the bots status',

  minArgs: 1,
  expectedArgs: '<status>',

  slash: 'both',
  testOnly: false,

  ownerOnly: true,

  callback: ({ message, client, text }) => {
    client.user?.setPresence({
      status: 'online',
      activities: [
        {
          name: text,
        },
      ],
    })

    return 'Status updated'
  },
}
