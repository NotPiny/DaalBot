    const reservedBacks = [
        'Invite',
        'Report',
        'Dashboard',
        'Home',
        'Uploads'
    ]
    const blockedBacks = [
        // Put any blocked back halfs here
    ]
    const { botPath } = require('../../config.json')
    const fs = require('fs')
    const { MessageEmbed } = require('discord.js')
    async function writeFile(dir, content) {
        try {
          await fs.appendFile(dir, content);
        } catch (err) {
          console.log(err);
        }
      }
    module.exports = {
       name: 'shorten',
       category: 'Utility', 
       description: 'Shortens a url',
  
       slash: true,
       testOnly: false,

       options: [
        {
            name: 'long-url',
            description: 'The URL to shorten',
            type: 'STRING',
            required: true
        },
        {
            name: 'back-half',
            description: 'The back half of the url (lnk.daalbot.xyz/BACKHALF)',
            type: 'STRING',
            required: true
        }
       ],
  
       callback: ( interaction, user, args ) => {
        return 'This command is currently disabled'
        // // Grab strings from options
        // const siteFolder = 'C:\\Users\\PinyLa\\Documents\\Code\\Html\\html\\firebase_daal-bot\\Site';
        // const long_url = interaction.options.getString('long-url');
        // const backHalf = interaction.options.getString('back-half');

        // if (fs.existsSync(`${siteFolder}\\${backHalf}`)) {
        //     return `\`${backHalf}\` is already in use!`;
        // } else {
        //     if (reservedBacks.includes(backHalf)) {
        //         return `\`${backHalf}\` is reserved by the code please try again`
        //     } else {
        //         if (blockedBacks.includes(backHalf)) {
        //             return `\`${backHalf}\` is not a allowed back half`
        //         }
        //         try {
        //             if (!fs.existsSync(`${siteFolder}\\${backHalf}`)) {
        //               fs.mkdirSync(`${siteFolder}\\${backHalf}`);
        //               fs.appendFile(`${siteFolder}\\${backHalf}/index.html`, `<meta http-equiv="Refresh" content="0; url='${long_url}'">`, function (err) {
        //                 if (err) {
        //                     console.log(err)
        //                 }
        //               });
        //             //   fs.appendFile(`${siteFolder}\\${backHalf}/owner.txt`, `${user.id}`, function (err) {
        //             //     if (err) {
        //             //         console.log(err)
        //             //     }
        //             //   })
        //             } else {
        //                 console.log('OOF!')
        //                 return `Something went wrong`
        //             }
        //           } catch (err) {
        //             console.log(err);
        //             return `We were unable to create the link :(`
        //           }
        //           require('child_process').exec(`start "" "${botPath}\\Batch/firebase-deploy.bat"`);
        //           return `Link Made!\nhttps://lnk.daalbot.xyz/${backHalf}`
        //     }
        // }
    },
  }