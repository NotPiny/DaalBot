// const config = require('../config.json')
// const fs = require('fs')
// const commandFiles = fs.readdirSync(`${config.botPath}\\commands\\command-info`).filter(file => file.endsWith('.js'));

module.exports = {
   name: 'cmds',
   category: 'Testing', 
   description: 'Brings up a list of commands or info on a specific command',

   slash: true,
   testOnly: true,

   callback: () => {
    return `command broken`
   }
}

//    options: [
//     {
//       name: 'command',
//       description: 'The command to look up',
//       type: 'STRING',
//       required: false,
//     },
//   ],

//    callback: ( interaction ) => {
//     let text = ``
//     const CommandLK = interaction.options.getString('command')
//     if (CommandLK == null) {
//       // Runs if there is no command to look up
//       const test = 1
//       for (const file of commandFiles) {
//         if (file.startsWith('pen')) continue;
//         text += `${file}\n`;
//         return text;
//       }
//     } else {

//       const path = `./command-info/${CommandLK}`

//       fs.access(path, fs.F_OK, (err) => {
//         if (err) {
//           console.log(err)
//           return `Something went wrong!`
//         }
//         // Runs if file exists
//         const commandData = require(`./command-info/${CommandLK}`)
//         return `TODO`
//       })
//     }
//   },
// }