module.exports = {
    category: 'Testing',
    description: 'Runs the current command being tested',
  
    slash: 'both',
    testOnly: true,
  
    callback: (user) => {
      return `CHECK THE CONSOLE!!!!!!!!!!!!!`
    },
  }