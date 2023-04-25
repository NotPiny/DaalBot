const { MessageEmbed } = require('discord.js');
const daalbot = require('../../daalbot.js');

module.exports = {
        category: 'Message',
        description: 'Send a custom embed in a channel',
      
        slash: true,
        ownerOnly: false,
        testOnly: false,
        guildOnly: true,

        requireRoles: true,

        options: [
            {
                name: 'channel',
                description: 'The channel to send the embed',
                type: 'CHANNEL',
                required: true,
            },
            {
                name: 'title',
                description: `The title of the embed`,
                type: 'STRING',
                required: false,
            },
            {
                name: 'url',
                description: 'The URL that the embed links to',
                type: 'STRING',
                required: false,
            },
            {
                name: 'description',
                description: 'Sets the description of the embed',
                type: 'STRING',
                required: false,
            },
            {
                name: 'author',
                description: 'Sets the author of the embed',
                type: 'STRING',
                required: false,
            },
            {
                name: 'footer',
                description: 'Sets the footer of the embed',
                type: 'STRING',
                required: false,
            },
            {
                name: 'colour',
                description: `The colour of the embed`,
                type: 'STRING',
                required: false,
            },
            {
                name: 'thumbnail',
                description: 'Sets the thumbnail of the embed',
                type: 'ATTACHMENT',
                required: false,
            },
            {
                name: 'image',
                description: 'Sets the main image of the embed',
                type: 'ATTACHMENT',
                required: false,
            },
            {
                name: 'author-icon',
                description: 'Sets the icon of the author',
                type: 'ATTACHMENT',
                required: false,
            },
            {
                name: 'footer-icon',
                description: 'Sets the icon of the footer',
                type: 'ATTACHMENT',
                required: false,
            },
            {
                name: 'message',
                description: 'The message content to send with the embed',
                type: 'STRING',
                required: false,
            },
            {
                name: 'message-id',
                description: 'If used, the embed will be edited / appended to a existing message instead of sending a new one',
                type: 'STRING',
                required: false,
            }
        ],
      
        callback: async ({ interaction }) => {
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
        const easyColours = [{name: 'red',value: 'RED'},{name: 'green',value: 'GREEN'},{name: 'greyple',value: 'GREYPLE'},{name: 'blurple',value: 'BLURPLE'},{name: 'gold',value: 'GOLD'},{name: 'orange',value: 'ORANGE'},{name: 'yellow',value: 'YELLOW'},{name: 'aqua',value: 'AQUA'},{name: 'darkgreen',value: 'DARK_GREEN'},{name: 'darkblue',value: 'DARK_BLUE'},{name: 'darkpurple',value: 'DARK_PURPLE'},{name: 'darkviolet',value: 'DARK_VIOLET'},{name: 'darkorange',value: 'DARK_ORANGE'},{name: 'darkgold',value: 'DARK_GOLD'},{name: 'darkgrey',value: 'DARK_GREY'},{name: 'lightgrey',value: 'LIGHT_GREY'},{name: 'navy',value: 'NAVY'},{name: 'darkaqua',value: 'DARK_AQUA'},{name: 'darkred',value: 'DARK_RED'},{name: 'random',value: 'RANDOM'},{name: 'daalbotpurple',value: '#502898'},{name: 'vortexblue',value: '#00aae3'}];

        const colours = easyColours.map(colour => colour.name);

        if (!hexColourRegex.test(colour) && !colours.includes(colour) && colour != null) interaction.editReply(`Invalid colour. Please use a hex code or one of the following: \`\`\`\n${colours.join(', ')}\n\`\`\``);

        const embed = new MessageEmbed()

        if (isUsed(title)) embed.setTitle(title);
        if (isUsed(url)) embed.setURL(url);
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

            if (!message) {
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
    }
}