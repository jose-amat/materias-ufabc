const express = require('express');
const router = express.Router();

// RETORNA TODAS AS MATERIAS
router.get('/', (req, res, next) => {
  res.status(200).send({
    mensagem: 'Retorna todas as matérias'
  });
});

// INSERE UMA MATERIA
router.post('/', (req, res, next) => {
  res.status(201).send({
    mensagem: 'A matéria foi criada'
  });
});

// RETORNA UMA MATERIA ESPECIFICA
router.get('/:id_materias', (req, res, next) => {
  const id = req.params.id_materias;
  res.status(200).send({
    mensagem: 'Detalhes da matéria',
    id: id
  });
});

// ALTERA UMA MATERIA
router.patch('/', (req, res, next) => {
  res.status(201).send({
    mensagem: 'Matéria alterada'
  });
});

// EXCLUI UMA MATERIA
router.delete('/', (req, res, next) => {
  res.status(201).send({
    mensagem: 'Matéria excluída'
  });
});

module.exports = router;