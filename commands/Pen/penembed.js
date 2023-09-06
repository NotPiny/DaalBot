const { EmbedBuilder } = require('discord.js');
const DJS = require('discord.js');
const daalbot = require('../../daalbot.js');
const commandTypes = DJS.ApplicationCommandOptionType; // Nobody needs that long ass name

module.exports = {
        category: 'Pen',
        description: 'Pen version of the embed command',
      
        type: 'SLASH',
        ownerOnly: true,
        testOnly: false,
        guildOnly: true,

        options: [
            {
                name: 'builder',
                description: 'Create an embed',
                type: commandTypes.Subcommand,
                options: [
                    {
                        name: 'channel',
                        description: 'The channel to send the embed',
                        type: commandTypes.Channel,
                        required: true,
                    },
                    {
                        name: 'title',
                        description: `The title of the embed`,
                        type: commandTypes.String,
                        required: false,
                    },
                    {
                        name: 'url',
                        description: 'The URL that the embed links to',
                        type: commandTypes.String,
                        required: false,
                    },
                    {
                        name: 'description',
                        description: 'Sets the description of the embed',
                        type: commandTypes.String,
                        required: false,
                    },
                    {
                        name: 'author',
                        description: 'Sets the author of the embed',
                        type: commandTypes.String,
                        required: false,
                    },
                    {
                        name: 'footer',
                        description: 'Sets the footer of the embed',
                        type: commandTypes.String,
                        required: false,
                    },
                    {
                        name: 'colour',
                        description: `The colour of the embed`,
                        type: commandTypes.String,
                        required: false,
                    },
                    {
                        name: 'thumbnail',
                        description: 'Sets the thumbnail of the embed',
                        type: commandTypes.Attachment,
                        required: false,
                    },
                    {
                        name: 'image',
                        description: 'Sets the main image of the embed',
                        type: commandTypes.Attachment,
                        required: false,
                    },
                    {
                        name: 'author-icon',
                        description: 'Sets the icon of the author',
                        type: commandTypes.Attachment,
                        required: false,
                    },
                    {
                        name: 'footer-icon',
                        description: 'Sets the icon of the footer',
                        type: commandTypes.Attachment,
                        required: false,
                    },
                    {
                        name: 'message',
                        description: 'The message content to send with the embed',
                        type: commandTypes.String,
                        required: false,
                    },
                    {
                        name: 'message-id',
                        description: 'If used, the embed will be edited / appended to a existing message instead of sending a new one',
                        type: commandTypes.String,
                        required: false,
                    }
                ]
            },
            {
                name: 'json',
                description: 'Create an embed from JSON',
                type: commandTypes.Subcommand,
                options: [
                    {
                        name: 'channel',
                        description: 'The channel to send the embed :D',
                        type: commandTypes.Channel,
                        required: true,
                    }
                ]
            }
        ],
      
        callback: async ({ interaction }) => {
        if (interaction.options.getSubcommand() === 'builder') {
            // return 'Command has been disabled'
            const title = interaction.options.getString('title');
            let url = interaction.options.getString('url');
            const author = interaction.options.getString('author');
            const description = interaction.options.getString('description');
            const colour = interaction.options.getString('colour')?.replace(' ', '');
            const footer = interaction.options.getString('footer');
            let channel = interaction.options.getChannel('channel');
            const thumbnail = interaction.options.getAttachment('thumbnail');
            const image = interaction.options.getAttachment('image');
            const authorIcon = interaction.options.getAttachment('author-icon');
            const footerIcon = interaction.options.getAttachment('footer-icon');
            const message = interaction.options.getString('message');
            const messageId = interaction.options.getString('message-id');
            
            await interaction.reply({
                content: 'Generating embed...',
                ephemeral: true
            })
    
            const isValidImage = (attachment) => {
                if (!isUsed(attachment)) return true; // If the image was not provided, it is valid
    
                const validImageTypes = ['png', 'jpg', 'jpeg'];
    
                const link = getAttachmentLink(attachment);
    
                const extension = link.split('.').pop();
    
                return validImageTypes.includes(extension);
            }
            const getAttachmentLink = (attachment) => `${attachment.proxyURL}`;
    
            const getPermanentLink = async(attachment) => {
                if (attachment) {
                    const tempLink = getAttachmentLink(attachment);
    
                    // const buffer = await axios.get(tempLink, { responseType: 'arraybuffer' });
    
                    // const attachmentName = attachment.name;
    
                    // const attachmentFile = new MessageAttachment(buffer, attachmentName);
    
                    const channel = daalbot.client.guilds.cache.get('1017715574639431680').channels.cache.get('1096419624825929872')
    
                    // const message = await channel.send({ files: [attachmentFile] });
                    const message = await channel.send({ files: [tempLink] });
    
                    const url = message.attachments.first().proxyURL;
    
                    return url;
                } else {
                    return null;
                }
            };
            const isUsed = (option) => option != null;
    
            // Check if the embed settings are valid
            if (!isUsed(title) && !isUsed(description) && !isUsed(author) && !isUsed(footer) && !isUsed(thumbnail) && !isUsed(image)) return interaction.editReply({ content: 'You must provide a title, description, author, footer, thumbnail or image' });
    
            if (!isValidImage(thumbnail)) return interaction.editReply({ content: 'Invalid thumbnail' });
            if (!isValidImage(image)) return interaction.editReply({ content: 'Invalid image' });
            if (!isValidImage(authorIcon)) return interaction.editReply({ content: 'Invalid author icon' });
            if (!isValidImage(footerIcon)) return interaction.editReply({ content: 'Invalid footer icon' });
    
            if (url && !url.startsWith('https://') ) url = `https://${url.replace('http://', '')}`;
            if (url && !isUsed(title)) return interaction.editReply({ content: 'You must provide a title if you want to provide a URL' });
    
            if (!isUsed(author) && isUsed(authorIcon)) return interaction.editReply({ content: 'You must provide an author if you want to provide an author icon' });
            if (!isUsed(footer) && isUsed(footerIcon)) return interaction.editReply({ content: 'You must provide a footer if you want to provide a footer icon' });
    
            const hexColourRegex = new RegExp(`^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$`);
            const easyColours = [
                { name: 'red', value: 'Red' },
                { name: 'green', value: 'Green' },
                { name: 'greyple', value: 'Greyple' },
                { name: 'blurple', value: 'Blurple' },
                { name: 'gold', value: 'Gold' },
                { name: 'orange', value: 'Orange' },
                { name: 'yellow', value: 'Yellow' },
                { name: 'aqua', value: 'Aqua' },
                { name: 'darkgreen', value: 'DarkGreen' },
                { name: 'darkblue', value: 'DarkBlue' },
                { name: 'darkpurple', value: 'DarkPurple' },
                { name: 'darkviolet', value: 'DarkViolet' },
                { name: 'darkorange', value: 'DarkOrange' },
                { name: 'darkgold', value: 'DarkGold' },
                { name: 'darkgrey', value: 'DarkGrey' },
                { name: 'lightgrey', value: 'LightGrey' },
                { name: 'navy', value: 'Navy' },
                { name: 'darkaqua', value: 'DarkAqua' },
                { name: 'darkred', value: 'DarkRed' },
                { name: 'random', value: 'Random' },
                { name: 'daalbotpurple', value: '#502898' },
                { name: 'vortexblue', value: '#00aae3' }
            ];
              
    
            const colours = easyColours.map(colour => colour.name);
    
            if (!hexColourRegex.test(colour) && !colours.includes(colour) && colour != null) interaction.editReply(`Invalid colour. Please use a hex code or one of the following: \`\`\`\n${colours.join(', ')}\n\`\`\``);
    
            const embed = new EmbedBuilder()
    
            if (isUsed(title)) embed.setTitle(title);
            // if (isUsed(url)) embed.setURL(url);
            if (isUsed(author)) embed.setAuthor({
                name: author,
                iconURL: isUsed(authorIcon) ? await getPermanentLink(authorIcon) : ''
            });
            if (isUsed(description)) embed.setDescription(description.replace(/<nl>/g, '\n'));
            if (isUsed(colour)) {
                // Check if the colour is a hex code or a name
                if (hexColourRegex.test(colour)) {
                    embed.setColor(colour);
                } else if (colours.includes(colour)) {
                    const colourObj = easyColours.find(colourObj => colourObj.name === colour);
                    embed.setColor(colourObj.value);
                }
            }
            if (isUsed(footer)) embed.setFooter({
                text: footer,
                iconURL: isUsed(footerIcon) ? await getPermanentLink(footerIcon) : ''
            });
            if (isUsed(thumbnail)) embed.setThumbnail(await getPermanentLink(thumbnail));
            if (isUsed(image)) embed.setImage(await getPermanentLink(image));
    
            if (isUsed(messageId)) {
                const message = await channel.messages.fetch(messageId)
    
                if (message.id == undefined) {
                    interaction.editReply('Invalid message ID');
                } else {
                    message.edit({
                        content: isUsed(message) ? message : null,
                        embeds: [embed]
                    })
                }
            } else {
                channel.send({
                    content: isUsed(message) ? message : null,
                    embeds: [embed]
                })
            }
    
            interaction.editReply({
                content: 'Embed sent!',
                embeds: [embed]
            })
        } else if (interaction.options.getSubcommand() === 'json') {
            const modal = new DJS.ModalBuilder()
                .setTitle('Embed JSON')
                .setCustomId('handler_pen-embed-json')

            const row = new DJS.ActionRowBuilder()

            const textInput = new DJS.TextInputBuilder()
                .setCustomId('json-input')
                .setPlaceholder('Enter JSON')
                .setLabel('JSON')
                .setMinLength(1)
                .setRequired(true)
                .setStyle(DJS.TextInputStyle.Paragraph)

            const row2 = new DJS.ActionRowBuilder()

            const channelIdInput = new DJS.TextInputBuilder()
                .setCustomId('channel-id')
                .setPlaceholder('Enter channel ID')
                .setLabel('Channel ID (don\'t modify)')
                .setRequired(true)
                .setValue(`${interaction.options.getChannel('channel').id}`)
                .setStyle(DJS.TextInputStyle.Short)

            row.addComponents([textInput])
            row2.addComponents([channelIdInput])
            modal.addComponents([row, row2])

            interaction.showModal(modal)
        }
    }
}