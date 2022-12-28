//const stuff
const client = require('../client');
// Command Stuff :P
client.on("messageCreate", msg => {
  if (msg.author.id === client.user.id) {
    return
  }
    if (msg.content.toLowerCase().endsWith(":p")) {
        msg.channel.send(":P");
        console.log(msg.author.tag + ' used :P');
    }
})