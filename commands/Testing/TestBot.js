module.exports = {
    category: 'Testing',
    description: 'Tests if the bot is responding',
  
    slash: 'both',
    testOnly: false,
  
    callback: (interaction) => {
      interaction.reply({content: 'The bot is responding'})
      .then(() => { console.log(':)') })
      .catch(() => { console.log('bruh') })
  }
}