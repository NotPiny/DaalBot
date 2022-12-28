const { mongoose, Schema } = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const welcomeSchema = new Schema({
  _id: reqString, // Guild ID
  channelId: reqString, // Channel ID taken from command
})

const name = 'log-options'
module.exports =
  mongoose.models[name] ||
  mongoose.model(name, welcomeSchema, name)