const config = require('../config.json');
const client = require('../client');
function botLog(text) {
    client.channels.cache.find(channel => channel.id === config.Logchannel).send(text);
    console.log(text);
    return `Success`;
}
// Interval restart
require('child_process').exec(`start "" "${config.botPath}\\Batch/intRestart.bat"`);
function unixRestart () {
  const secondsSinceEpoch = Math.round(Date.now() / 1000)
  return (secondsSinceEpoch + 9000)
}
const restartTime = unixRestart();
botLog(`Restart > Bot will auto restart <t:${restartTime}:R>`)
setTimeout(() => {
  client.destroy();
}, 9000000);