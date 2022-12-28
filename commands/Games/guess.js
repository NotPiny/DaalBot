function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

function wait(seconds) {
   setTimeout(() => {
      return
   }, seconds * 1000);
}

  module.exports = {
     category: 'Games', 
     description: 'Guess the number.',

     slash: true,
     testOnly: true,
     ownerOnly: true,

     options: [
      {
         name: 'guess',
         description: 'Your guess.',
         type: 'NUMBER',
         required: true,
      }
     ],

     callback: ( interaction ) => {
        const answer = (getRandomInt(100) + 1) // Returns a random number from 1 -> 100
        const guess = interaction.options.getNumber('guess')

        interaction.reply(`You guess ${guess}`)
        .then(() => { console.log(':)') })
        .catch(() => { console.log('bruh') });
        interaction.channel.sendTyping();
        wait(3)
        interaction.followUp(`The correct number was ${answer}`)
        .then(() => { console.log(':)') })
        .catch(() => { console.log('bruh') });
        if (guess === answer) {
         interaction.channel.send('You win :)')
        } else {
         interaction.channel.send('You lost :(')
        }
     }, 
  } 