// const { MessageAttachment } = require('discord.js')
// const { createCanvas, loadImage } = require('canvas')
module.exports = {
    name: 'image',
    category: 'Testing',
    description: 'modifies an image',
    slash: true,
    testOnly: true,

    options: [
        {
            name: 'image',
            description: 'the image to modify',
            type: 'STRING',
            required: true
        },
        {
            name: 'text',
            description: 'the text to add to the image',
            type: 'STRING',
            required: true
        }
    ],

    callback: async ({ interaction, client }) => {
        // try {
        // const canvas = createCanvas(500, 500)
        // const ctx = canvas.getContext('2d')
        // const background = await loadImage(interaction.options.getString('image'));
        // ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
        // ctx.strokeStyle = '#74037b'
        // ctx.strokeRect(0, 0, canvas.width, canvas.height)
        // ctx.font = '28px sans-serif'
        // ctx.fillStyle = '#ffffff'
        // ctx.fillText(interaction.options.geString('text'), canvas.width / 2.5, canvas.height / 1.8)
        // const attachment = new MessageAttachment(canvas.toBuffer(), 'Output.png')
        // interaction.reply({ files: [attachment] })
        // } catch (err) {
        //     console.log(err)
        // }
    }
}