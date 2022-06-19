module.exports = {
    category: 'Other',
    description: 'Runs the current command being tested',
  
    slash: true,
    testOnly: true,
  
    callback: (user) => {
      return `${user}`
    },
  }