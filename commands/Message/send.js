const { ChannelType, PermissionFlagsBits, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  category: 'Message',
  description: 'Sends a message.',

  permissions: [
    PermissionFlagsBits.ManageMessages,
  ],

  minArgs: 2,
  expectedArgs: '<channel> <text>',
  expectedArgsTypes: ['CHANNEL', 'STRING'],

  type: 'SLASH',
  testOnly: false,
  guildOnly: true,

  options: [
    {
      name: 'channel',
      description: 'The channel to send the text to',
      type: ApplicationCommandOptionType.Channel,
      required: true
    },
    {
      name: 'text',
      description: 'The text to send',
      type: ApplicationCommandOptionType.String,
      required: true
    }
  ],

  callback: ({ interaction }) => {
    const channel = interaction.options.getChannel('channel')
    if (!channel || (channel.type !== ChannelType.GuildText && channel.type !== ChannelType.GuildAnnouncement)) {
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