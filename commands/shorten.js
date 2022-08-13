const config = require('../config.json')
const USERNAME = config.username;
const fs = require('fs')
module.exports = {
    category: 'Links',
  description: 'Shortens a url',

  slash: true,
  testOnly: true,

  guildOnly: true,

  minArgs: 2,
  expectedArgs: '<long-url> <back-half>',
  expectedArgsTypes: ['STRING', 'STRING'],

  callback: ({ args }) => {
    const Blong_url = args.join(' ')
    const long_url = args[0];
    args.shift() // Removes the command name from the text
    const back_half = args.join(' ');
    const folderName = `/Users/${USERNAME}/Documents/Code/Html/html/firebase daal-bot/Site/${back_half}`;

    try {
        if (!fs.existsSync(folderName)) {
          fs.mkdirSync(folderName);
          fs.appendFile(`${folderName}/index.html`, `<meta http-equiv="Refresh" content="0; url='${long_url}'">`, function (err) {
            if (err) {
                console.log(err)
            }
            require('../firebase_deploy.bat')
            return `Link Made!`
          });
        }
      } catch (err) {
        console.error(err);
      }
  },
} 