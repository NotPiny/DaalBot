function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
const config = require('../../config.json')

  module.exports = {
     category: 'Games', 
     description: 'Rolls a dice against a cpu',

     slash: true,
     testOnly: false,

     callback: async ({ interaction }) => {
        let P1 = (getRandomInt(6) + 1); // Returns a random number from 1 -> 6
        let P2 = (getRandomInt(6) + 1); // Returns a random number from 1 -> 6

        let PT = P1 + P2;

        let C1 = (getRandomInt(6) + 1); // Returns a random number from 1 -> 6
        let C2 = (getRandomInt(6) + 1); // Returns a random number from 1 -> 6

        let CT = C1 + C2;

        if (config.WOKCommands.BotOwners.includes(interaction.user.id)) {
            if (P1 < 2) {
               P1 = 2
            }
            if (P2 < 2) {
               P2 = 2
            }
            PT = P1 + P2
            if (CT > PT) {
               if (P1 < 3) {
                  P1 = 3
               }
               if (P2 < 3) {
                  P2 = 3
               }
               PT = P1 + P2
            }
        }

        interaction.reply(`You roll the dice and get ${P1} and ${P2}`)
        .then(() => { console.log(':)') })
        .catch(() => { console.log('bruh') })
        
        
        setTimeout(() => {
             interaction.channel.send(`CPU rolls the dice and gets ${C1} and ${C2}`)
             
             
             if (PT > CT) {
                interaction.channel.send('You Won!')
                
                
               } else {
                interaction.channel.send('You Lost!')
                
                
               }
         }, 3000);
     }, 
  }