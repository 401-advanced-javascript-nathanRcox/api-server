'use strict';

const mongoose = require('mongoose');

const clothesSchema = mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  type: { type: String, uppercase: true, enum: ['MEN\'S', 'WOMEN\'S', 'TEEN\'S', 'CHILDREN\'S']}
});

const clothesModel = mongoose.model('clothes', clothesSchema);

module.exports = clothesModel;
