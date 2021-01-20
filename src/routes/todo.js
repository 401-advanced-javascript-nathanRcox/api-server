'use strict';

const express = require('express');
const router = express.Router();
const todoModel = require('../models/todo-model');
const Todo = require('../models/collection');
const todoInstance = new Todo(todoModel);
const validator = require('../middleware/validator');

router.post('/todo', createTodo);
router.get('/todo', getTodos);
router.get('/todo/:id', validator, getOneTodo);
router.put('/todo/:id', validator, updateTodo);
router.delete('/todo/:id', validator, deleteTodo);

async function createTodo(req, res) {
  res.status(200).json(await todoInstance.create(req.body));
};

async function getTodos(req, res) {
  res.status(200).json(await todoInstance.read());
};

async function getOneTodo(req, res) {
  res.status(200).json(await todoInstance.read(req.params.id));
};

async function updateTodo(req, res) {
  res.status(200).json(await todoInstance.update(req.params.id, req.body));
};

async function deleteTodo(req, res) {
  res.status(200).json(await todoInstance.delete(req.params.id));
};

module.exports = router;
