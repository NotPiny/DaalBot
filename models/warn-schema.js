// JAVASCRIPT:
const mongoose = require('mongoose')
const { Schema } = mongoose

const reqString = {
  type: String,
  required: true,
}

const schema = new Schema(
  {
    userId: reqString,
    guildId: reqString,
    reason: reqString,
    staffId: reqString,
  },
  {
    timestamps: true,
  }
)

const name = 'warns'

// JAVASCRIPT:
module.exports = mongoose.models[name] || mongoose.model(name, schema)
