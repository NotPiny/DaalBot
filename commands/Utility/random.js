function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

  module.exports = {
     name: 'rng',
     category: 'Utility', 
     description: 'ADD DESCRIPTION HERE',

     slash: true,
     testOnly: true,

     callback: ( interaction, args ) => {

        const number = (getRandomInt(10000) + 1)

        return number
        
        
  },
}