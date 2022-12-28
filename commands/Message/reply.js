module.exports = {
    name: 'reply',
    description: 'Replys to a message',
    category: 'message',
    slash: 'both',
    minArgs: 3,
    maxArgs: 3,
    requireRoles: true,
    expectedArgs: '<message> <text> <channel>',
    options: [
        {
            name: 'message',
            description: 'The message id to reply to',
            type: 'STRING',
            required: true
        },
        {
            name: 'text',
            description: 'The text to reply with',
            type: 'STRING',
            required: true
        },
        {
            name: 'channel',
            description: 'The channel the message is in',
            type: 'CHANNEL',
            required: true
        }
    ],
    testOnly: true,

    callback: ({ message, args, client, prefix, instance, interaction }) => {
        let msgInt;
        if (message) {
            msgInt = message;
        } else {
            msgInt = interaction;
        }

        let msgID;
        if (message) {
            msg = args[0];
        } else {
            msg = interaction.options.getString('message');
        }

        let text;
        if (message) {
            text = args[1];
        } else {
            text = interaction.options.getString('text');
        }

        let channel;
        if (message) {
            channel = message.mentions.channels.first();
        } else {
            channel = interaction.options.getChannel('channel');
        }

        if (!channel || channel.type !== 'GUILD_TEXT') {
            return 'Please tag a text channel.'
        }

        const targetMessage = channel.messages.fetch(msgID, {
            cache: true,
            force: true,
        })

        if (targetMessage) {
            targetMessage.reply(text);
        } else {
            msgInt.reply('Unknown message ID.');
        }
    }
}