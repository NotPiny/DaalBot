module.exports = {
  category: 'Configuration',
  description: 'Sets the bots status',

  minArgs: 1,
  expectedArgs: '<status>',

  slash: 'both',
  testOnly: true,

  ownerOnly: true,

  callback: ({ client, text }) => {
    console.log(`${msg.author.tag} ran /status`)
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
