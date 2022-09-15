// Run this file with "node delete-slash.js"
require('dotenv').config();
const token = process.env.TOKEN;
const id = '1016313877262258186'
const client = require('./client');

client.application.commands.fetch(id)
      .then( (command) => {
    console.log(`Fetched command ${command.name}`)
    // further delete it like so:
    // command.delete()
    // console.log(`Deleted command ${command.name}`)
    }).catch(console.error);

client.login(token)