const daalbot = require('../../daalbot.js')
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'pensend',
  description: 'send but pen :D',
  category: 'Pen',

  slash: true,
  ownerOnly: true,

  options: [
    {
      name: 'channel',
      description: 'The channel to send the message to.',
      type: 'CHANNEL',
      required: true
    },
    {
      name: 'message',
      description: 'The message to send.',
      type: 'STRING',
      required: false
    },
    {
      name: 'attachment',
      description: 'The attachment to send.',
      type: 'ATTACHMENT',
      required: false
    }
  ],

  callback: async ({ interaction }) => {
    const channelID = interaction.options.getChannel('channel').id
    const message = `${interaction.options.getString('message')}`
    const attachment = interaction.options.getAttachment('attachment')

    const isUsed = (option) => option != null;

    const channel = daalbot.getChannel(interaction.guild.id, channelID)

    if (channel == undefined) return interaction.reply({ content: 'The channel you provided is not a valid channel.', ephemeral: true })
    if (channel == 'Channel not found.') return interaction.reply({ content: 'The channel you provided is not a valid channel.', ephemeral: true })
    if (channel == 'Server not found.') return interaction.reply({ content: 'The channel you provided is not a valid channel.', ephemeral: true })

    const getAttachmentLink = (attachment) => `${attachment.proxyURL}`;

    const attachmentLink = isUsed(attachment) ? getAttachmentLink(attachment) : null;

    try {
      if (!isUsed(message)) {
        if (!isUsed(attachment)) {
          return interaction.reply({ content: 'You must provide a message or attachment to send.', ephemeral: true })
        } else {
          channel.send({ files: [attachmentLink] })
        }
      } else {
        if (!isUsed(attachment)) {
          channel.send(message)
        } else {
          if (message != 'null') {
            channel.send({ content: message, files: [attachmentLink] })
          } else {
            channel.send({ files: [attachmentLink] })
          }
        }
      }

      const successEmbed = new MessageEmbed()
        .setColor('GREEN')
        .setTitle('Success')
        .setDescription('Message sent successfully.')

      return interaction.reply({ embeds: [successEmbed], ephemeral: true })
    } catch (error) {
      const errorEmbed = new MessageEmbed()
        .setColor('RED')
        .setTitle('Error')
        .setDescription(`An error occured while sending the message:\n\`\`\`${error}\n\`\`\``)

      return interaction.reply({ embeds: [errorEmbed], ephemeral: true })
    }
  }
}