module.exports = {
    name: 'attachment-thing',
    description: 'Testing with attachments',
    category: 'Testing',

    slash: true,
    testOnly: true,

    options: [
        {
            name: 'attachment',
            description: 'Attachment to test',
            type: 'ATTACHMENT',
            required: true
        }
    ],

    callback: ({ interaction }) => {
        const attachment = interaction.options.getAttachment('attachment');
        console.log(attachment);
        if (attachment.contenttype === 'image/png') {
            return 'Image is a PNG';
        } else {
            return 'Image is not a PNG';
        }
    }
}