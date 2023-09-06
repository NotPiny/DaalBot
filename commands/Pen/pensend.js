const daalbot = require('../../daalbot.js')
const { EmbedBuilder } = require('discord.js')
const DJS = require('discord.js')
const commandOptionType = DJS.ApplicationCommandOptionType;

module.exports = {
  name: 'pensend',
  description: 'send but pen :D',
  category: 'Pen',

  type: 'SLASH',
  ownerOnly: true,

  options: [
    {
      name: 'builder',
      description: 'create a new message',
      type: commandOptionType.Subcommand,
      options: [
        {
          name: 'channel',
          description: 'The channel to send the message to.',
          type: commandOptionType.Channel,
          required: true
        },
        {
          name: 'message',
          description: 'The message to send.',
          type: commandOptionType.String,
          required: false
        },
        {
          name: 'attachment',
          description: 'The attachment to send.',
          type: commandOptionType.Attachment,
          required: false
        }
      ]
    },
    {
      name: 'json',
      description: 'send a message from json',
      type: commandOptionType.Subcommand,
      options: [
        {
          name: 'channel',
          description: 'The channel to send the message to.',
          type: commandOptionType.Channel,
          required: true
        }
      ]
    }
  ],

  callback: async ({ interaction }) => {
    if (interaction.options.getSubcommand() === 'builder') {
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
  
        const successEmbed = new EmbedBuilder()
          .setColor('#57F28D')
          .setTitle('Success')
          .setDescription('Message sent successfully.')
  
        return interaction.reply({ embeds: [successEmbed], ephemeral: true })
      } catch (error) {
        const errorEmbed = new EmbedBuilder()
          .setColor('#EF3D48')
          .setTitle('Error')
          .setDescription(`An error occured while sending the message:\n\`\`\`${error}\n\`\`\``)
  
        return interaction.reply({ embeds: [errorEmbed], ephemeral: true })
      }
    } else if (interaction.options.getSubcommand() === 'json') {
      const modal = new DJS.ModalBuilder()
        .setTitle('JSON Message')
        .setCustomId('handler_pensend-json')

      const channelID = interaction.options.getChannel('channel').id

      const row1 = new DJS.ActionRowBuilder()
      const row2 = new DJS.ActionRowBuilder()

      const input1 = new DJS.TextInputBuilder()
        .setCustomId('json-input')
        .setPlaceholder('Enter your JSON here.')
        .setRequired(true)
        .setStyle(DJS.TextInputStyle.Paragraph)
        .setLabel('JSON')

      const input2 = new DJS.TextInputBuilder()
        .setCustomId('channel-id')
        .setPlaceholder('Enter the channel ID here.')
        .setLabel('Channel ID (Don\'t modify)')
        .setStyle(DJS.TextInputStyle.Short)
        .setValue(channelID)
        .setRequired(true)

      row1.addComponents(input1)
      row2.addComponents(input2)

      modal.addComponents([row1, row2])

      interaction.showModal(modal)
    }
  }
}