function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

  module.exports = {
     name: 'rng',
     category: 'Utility', 
     description: 'ADD DESCRIPTION HERE',

     slash: true,
     testOnly: true,

     minArgs: 2,
     maxArgs: 2,
     expectedArgs: '<min> <max>',
     expectedArgsTypes: ['INTEGER', 'INTEGER'],

     callback: ( interaction, args ) => {
        const min = args.shift()
        const max = args.shift()

        let number = (getRandomInt(max) + 1)

        if (number > min) {
          number = min
        }

        return number;
  },
}