const client = require('./client');

const id = '1016314416884633652'

const commands = client.application?.commands

const output = commands?.delete(id)

console.log(output);