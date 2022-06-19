module.exports = {
  category: 'Piny Only',
  description: 'Sets the bots status',

  minArgs: 1,
  expectedArgs: '<status>',

  slash: true,
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
