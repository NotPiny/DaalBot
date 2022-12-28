const actions = ['rock', 'paper', 'scissors']

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  module.exports = {
     category: 'Games', 
     description: 'Play RPS against a cpu',

     slash: true,
     testOnly: false,

     options: [
        {
            name: 'move',
            description: `The move to play against the cpu`,
            type: 'STRING',
            required: true,
            choices: actions.map((action) => ({
              name: action,
              value: action,
            })),
          },
     ],

     callback: ( interaction ) => {
        const cpuP = getRandomInt(3) // Returns a random number from 0 => 3
        const move = interaction.options.getString('move') // Gets the users move from the options

        if (!move || !actions.includes(move)) {
            interaction.reply(`Unknown move! Please use one of the following: ${actions.join(
              ', '
            )}`)
          .then(() => { console.log(':)') })
          .catch(() => { console.log('bruh') })
          }

        if (cpuP === 0) {
            // Runs if random number gen returns 0
            if(move === 'rock'){
                return `CPU went for rock, \nYou went for ${move}, \nIts a tie!`
                
                
            }
            if(move === 'paper'){
                return `CPU went for rock, \nYou went for ${move}, \nYou win :)`
                
                
            }
            if(move === 'scissors'){
                return `CPU went for rock, \nYou went for ${move}, \nYou lost :(`
                
                
            }
        }

        if (cpuP === 1) {
            // Runs if random number gen returns 1
            if(move === 'rock'){
                return `CPU went for paper, \nYou went for ${move}, \nYou lost :(`
                
                
            }
            if(move === 'paper'){
                return `CPU went for paper, \nYou went for ${move}, \nIts a tie!`
                
                
            }
            if(move === 'scissors'){
                return `CPU went for paper, \nYou went for ${move}, \nYou win :)`
                
                
            }
        }

        if (cpuP === 2) {
            // Runs if random number gen returns 2
            if(move === 'rock'){
                return `CPU went for scissors, \nYou went for ${move}, \nYou win :)`
                
                
            }
            if(move === 'paper'){
                return `CPU went for scissors, \nYou went for ${move}, \nYou lost :(`
                
                
            }
            if(move === 'scissors'){
                return `CPU went for scissors, \nYou went for ${move}, \nIts a tie!`
                
                
            }
        }
     }, 
  }