require('dotenv/config')
const client = require('./client.js');

require('./handler'); 

client.login(process.env.TOKEN);