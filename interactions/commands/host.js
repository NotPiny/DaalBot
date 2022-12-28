const client = require('../../client.js');
const path = require('path');
const fs = require('fs');
const https = require('https');
const { execSync } = require('child_process');
const daalbot = require('../../daalbot.js');

function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function downloadFile(url, fileObj, fileName) {
    const allowedTypes = 'application/javascript,application/json,image/png,image/jpeg,image/gif,text/plain,text/html,text/css,text/csv'.split(',');
    if (fileObj.size > 8388608) {
        return 'File size too large. Max 8MB. (Storage doesn\'t grow on trees you know)';
    }

    if (!allowedTypes.includes(fileObj.contentType)) {
        return 'File type is not allowed. If you are using a archive, please extract it and upload the files individually.';
    }

    const filePath = path.resolve(`./Media/public/${fileName}`);
    const file = fs.createWriteStream(filePath);
    const request = https.get(url);

    request.on('response', (response) => {
        if (response.statusCode !== 200) {
            return 'Error contacting discords servers. Please try again later.';
        }

        console.log('Got response from discord servers');

        response.pipe(file);
    });

    request.on('finish', () => {
        file.close();
        return 'File downloaded successfully.';
    })

    request.on('error', (err) => {
        console.warn(err);
    });
}

function firebaseDeploy() {
    const result = execSync(`start ${path.resolve('./Batch/hostDeploy.bat')}`);
}

client.on('interactionCreate', async(interaction) => {
    try {
    if (!interaction.isCommand()) return;
    if (interaction.commandName !== 'host') return;
    
    const file = interaction.options.getAttachment('file');

    if (file == null) return await interaction.reply('No file was provided.');
    const fileURL = file.url;
    let fileName = generateRandomString(5);
    const fileExtension = fileURL.split('.')[fileURL.split('.').length - 1];
    fileName += `.${fileExtension}`;

    const result = downloadFile(fileURL, file, fileName);

    return await interaction.reply(`File hosted at https://media.daalbot.xyz/${fileName}`);
    } catch {
        console.log('Oh no, an error occured!')
    }
})