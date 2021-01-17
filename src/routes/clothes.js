'use strict';

const express = require('express');
const router = express.Router();
const clothesModel = require('../models/clothes-model');
const Clothes = require('../models/collection');
const clothesInstance = new Clothes(clothesModel);
const validator = require('../middleware/validator');

router.get('/', (req, res) => {
  res.status(200).send('Howdy, Pardner');
});


//RESTful routes
router.post('/clothes', createClothes);
router.get('/clothes', getClothes);
router.get('/clothes/:id', validator, getOneItemOfClothes)
router.put('/clothes/:id', validator, updateClothes);
router.delete('/clothes/:id', validator, deleteClothes);

//RESTful route handlers
async function getClothes(req, res) {
  res.status(200).json(await clothesInstance.read());
}

async function getOneItemOfClothes(req, res) {
  console.log('REQ.PARAMS.ID:', req.params.id);
  res.status(200).json(await clothesInstance.read(req.params.id));
}

async function createClothes(req, res) {
  res.status(200).json(await clothesInstance.create(req.body));
}

async function updateClothes(req, res) {
  res.status(200).json(await clothesInstance.update(req.params.id, req.body));
}

async function deleteClothes(req, res) {
  res.status(200).json(await clothesInstance.delete(req.params.id));
}

// mongoose.disconnect();

module.exports = router;
