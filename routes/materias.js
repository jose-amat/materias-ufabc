const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

// RETORNA TODAS AS MATERIAS
router.get('/', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
    conn.query(
      'SELECT * FROM materias;',
      (error, resultado, fields) => {
        if (error) { return res.status(500).send({ error: error}) }
        return res.status(200).send({ response: resultado })
      }
    )
  });
});

// INSERE UMA MATERIA
router.post('/', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
    conn.query(
      'INSERT INTO materias (nome, creditos, descricao) VALUES (?, ?, ?)',
      [req.body.nome, req.body.creditos, req.body.descricao],
      (error, resultado, field) => {
        conn.release();
        if (error) { return res.status(500).send({ error: error }) }
        res.status(201).send({
          mensagem: 'A matéria foi criada',
          id_materias: resultado.insertId
        });
      }
    )
  })
});

// RETORNA UMA MATERIA ESPECIFICA
router.get('/:id_materias', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
    conn.query(
      'SELECT * FROM materias WHERE id_materias = ?;',
      [req.params.id_materias],
      (error, resultado, field) => {
        conn.release();
        if (error) { return res.status(500).send({ error: error }) }
        return res.status(201).send({ response: resultado });
      }
    )
  });
});

// ALTERA UMA MATERIA
router.patch('/', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error })}
    conn.query(
      `UPDATE materias
        SET nome              = ?,
            creditos          = ?,
            descricao         = ?
      WHERE id_materias       = ?`,
      [
        req.body.nome, 
        req.body.creditos, 
        req.body.descricao, 
        req.body.id_materias
      ],
      (error, resultado, fields) => {
        conn.release();
        if (error) { return res.status(500).send({ error: error }) }

        res.status(202).send({
          mensagem: 'Materia alterada'
        });
      }
    )
  });
});

// EXCLUI UMA MATERIA
router.delete('/', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error })}
    conn.query(
      'DELETE FROM materias WHERE id_materias = ?',
      [req.body.id_materias],
      (error, resultado, fields) => {
        conn.release();
        if (error) { return res.status(500).send({ error: error }) }

        res.status(202).send({
          mensagem: 'Materia removido com sucesso'
        });
      }
    )
  });
});

module.exports = router;