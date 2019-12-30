const mongoose = require('mongoose')
const middleware = require('./middleware/Feed.js')
const path = require('path')
const fs = require('fs')
const FilterBase = require('./common/FilterBase.js')
const packageVersion = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'package.json'))).version

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  guild: {
    type: String,
    required: true
  },
  channel: {
    type: String,
    required: true
  },
  webhook: {
    id: String,
    name: String,
    avatar: String
  },
  split: {
    enabled: Boolean,
    char: String,
    prepend: String,
    append: String,
    maxLength: Number
  },
  disabled: String,
  checkTitles: Boolean,
  checkDates: Boolean,
  imgPreviews: Boolean,
  imgLinksExistence: Boolean,
  formatTables: Boolean,
  toggleRoleMentions: Boolean,
  version: {
    type: String,
    default: packageVersion
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
})

schema.add(FilterBase)

schema.pre('validate', middleware.validate)

exports.schema = schema
exports.model = mongoose.model('Feed', schema)