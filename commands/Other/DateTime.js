const gmtDateTime = new Date().toUTCString();
module.exports = {
    category: 'Other',
    description: 'Says the time in GMT (may be out of sync due to daylight savings)',
  
    slash: 'both',
    testOnly: false,
  
    callback: () => {
      return gmtDateTime
  }
}