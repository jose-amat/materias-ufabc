const express = require('express');
const app = express();

const rotaMaterias = require('./routes/materias');

app.use('/materias', rotaMaterias);

module.exports = app;