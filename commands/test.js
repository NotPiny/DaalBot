module.exports = {
    category: 'Other',
    description: 'Runs the current command being tested',
  
    slash: 'both',
    testOnly: true,
  
    callback: (user) => {
      return `${user}`
    },
  }