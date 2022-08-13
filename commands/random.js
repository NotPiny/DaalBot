function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
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

        const number = getRandomIntInclusive(min, max)

        return number;
  },
}