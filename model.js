const mongoose = require('mongoose');

const XmenSchema = new mongoose.Schema({
  avatar: {type: String},
  name:[{real_name: { type: String, require: true}, codename: { type: String, require:true}}],
  team: {type: String, require: true},
  powers:[String]
})

const Xman = mongoose.model('xman', XmenSchema);
module.exports = Xman;
