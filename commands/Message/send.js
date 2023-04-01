module.exports = {
  category: 'Message',
  description: 'Sends a message.',

  requireRoles: true,

  minArgs: 2,
  expectedArgs: '<channel> <text>',
  expectedArgsTypes: ['CHANNEL', 'STRING'],

  slash: true,
  testOnly: false,
  guildOnly: true,

  options: [
    {
      name: 'channel',
      description: 'The channel to send the text to',
      type: 'CHANNEL',
      required: true
    },
    {
      name: 'text',
      description: 'The text to send',
      type: 'STRING',
      required: true
    }
  ],

  callback: (interaction) => {
    const channel = interaction.options.getChannel('channel')
    if (!channel || channel.type !== 'GUILD_TEXT') {
      return 'Please tag a text channel.'
    }
    const text = interaction.options.getString('text');
    const result = text.replace(/<nl>/g, "\n");

    channel.send(result)

    return {
      custom: true,
      content: `Sent \`\`\`\n${result}\n\`\`\` to ${channel}`,
      ephemeral: true
    }
  }
}