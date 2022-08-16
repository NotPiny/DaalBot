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
        const answer = (getRandomInt(100) + 1) // Returns a random number from 1 -> 100
        // TODO
     }, 
  }