const fs = require('fs');
const path = require('path');
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');
const { execSync } = require('child_process');

module.exports = {
    category: 'Guild',
    description: 'Sets the auto welcome settings for the server',

    slash: true,
    testOnly: true, //guild testing when true
    guildOnly: true,

    options: [
        {
            name: 'channel',
            description: 'The channel to send the welcome message in',
            type: 'CHANNEL',
            required: true,
        },
        {
            name: 'image',
            description: 'The image to send with the welcome message',
            type: 'ATTACHMENT',
            required: false,
        },
        {
            name: 'thumbnail',
            description: 'The thumbnail to send with the welcome message',
            type: 'ATTACHMENT',
            required: false,
        }
    ],

    callback: ({ interaction }) => {
        const channel = interaction.options.getChannel('channel');
        let image = interaction.options.getAttachment('image');
        let thumbnail = interaction.options.getAttachment('thumbnail');

        const data = {
            channel: channel.id,
            image: image?.url,
            thumbnail: thumbnail?.url
        }

        const downloadImage = (url, path) => {
            const https = require('https');
            try {
            if (fs.existsSync(path)) {
            fs.writeFileSync(path, '');
            const file = fs.createWriteStream(path);
            https.get(url, function(response) {
              response.pipe(file);
            });
        } else {
            fs.appendFileSync(path, '');
            const file = fs.createWriteStream(path);
            https.get(url, function(response) {
              response.pipe(file);
            });
        }
    } catch {
        return 'Error downloading image';
    }
        }

        const imagePath = `C:/Users/PinyLa/Documents/Code/Html/html/firebase_daal-bot/Site/Uploads/Welcome/${interaction.guild.id}-image.png`;
        const thumbnailPath = `C:/Users/PinyLa/Documents/Code/Html/html/firebase_daal-bot/Site/Uploads/Welcome/${interaction.guild.id}-thumbnail.png`;

        if (image == null) {
            console.log('Welcome CMD > No image provided');
        } else {
            downloadImage(image?.url, imagePath);
            console.log('Welcome CMD > Image downloaded');
        }

        if (thumbnail == null) {
            console.log('Welcome CMD > No thumbnail provided');
        } else {
            downloadImage(thumbnail?.url, thumbnailPath);
            console.log('Welcome CMD > Thumbnail downloaded');
        }

        if (fs.existsSync(path.resolve(`./db/welcome/${interaction.guild.id}.json`))) {
            fs.writeFileSync(path.resolve(`./db/welcome/${interaction.guild.id}.json`), JSON.stringify(data, null, 4));
        } else {
            fs.appendFileSync(path.resolve(`./db/welcome/${interaction.guild.id}.json`), JSON.stringify(data, null, 4));
        }     
        
        execSync(`start ${path.resolve('./Batch/firebase-deploy.bat')}`);

        return 'Welcome settings updated!';
    }
}