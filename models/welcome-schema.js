const { mongoose, Schema } = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const welcomeSchema = new Schema({
  // Guild ID
  _id: reqString,
  channelId: reqString,
  text: reqString,
})

const name = 'welcome-tutorial'
module.exports =
  mongoose.models[name] ||
  mongoose.model(name, welcomeSchema, name)
