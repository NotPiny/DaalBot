// JAVASCRIPT IMPORTS:
const mongoose = require('mongoose')

// TYPESCRIPT IMPORTS:
// import mongoose from 'mongoose'

const reqString = {
  type: String,
  required: true,
}

const schema = new mongoose.Schema({
  _id: reqString, // Guild ID
  channelId: reqString,
  messageId: reqString,
})

const Name = 'button-roles-tutorial'

// JAVASCRIPT EXPORT:
module.exports = mongoose.models[Name] || mongoose.model(Name, schema, Name)
