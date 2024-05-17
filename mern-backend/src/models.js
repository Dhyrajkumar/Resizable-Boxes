const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  text1: { type: String, default: '' },
  text2: { type: String, default: '' },
  text3: { type: String, default: '' },
  addCount: { type: Number, default: 0 },
  updateCount: { type: Number, default: 0 }
});

const DataModel = mongoose.model('Data', dataSchema);

module.exports = DataModel;
