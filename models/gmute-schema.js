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
  },
  {
    timestamps: true,
  }
)

const name = 'gmuted'

// JAVASCRIPT:
module.exports = mongoose.models[name] || mongoose.model(name, schema)
