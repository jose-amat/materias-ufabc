const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

// GET ALL
router.get('/', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
    conn.query(
      'SELECT * FROM base_disciplinas_ufabc;',
      (error, result, fields) => {
        if (error) { return res.status(500).send({ error: error}) }
        const response = {
          quantidade: result.length,
          materias: result.map(mat => {
            return {
              id_materias: mat.id_materias,
              nome: mat.nome,
              creditos: mat.creditos,
              descricao: mat.descricao,
              request: {
                tipo: 'GET',
                descricao: 'Retorna uma materia com ID especifico',
                url: 'http://localhost:3000/materias/' + mat.id_materias
              }
            }
          })
        }

        return res.status(200).send(response)
      }
    )
  });
});

// POST
router.post('/', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
    conn.query(
      'INSERT INTO base_disciplinas_ufabc (nome, creditos, descricao) VALUES (?, ?, ?)',
      [req.body.nome, req.body.creditos, req.body.descricao],
      (error, result, field) => {
        conn.release();
        if (error) { return res.status(500).send({ error: error }) }
        const response = {
          mensagem: 'Materia inserida com sucesso',
          materiCriada: {
            id_materias: result.id_materias,
            nome: req.body.nome,
            creditos: req.body.creditos,
            descricao: req.body.descricao,
            request: {
              tipo: 'POST',
              descricao: 'Insere uma materia',
              url: 'http://localhost:3000/materias'
            }
          }
        }

        res.status(201).send(response);
      }
    )
  })
});

// GET SINGLE
router.get('/:id_materias', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error }) }
    conn.query(
      'SELECT * FROM base_disciplinas_ufabc WHERE id_materias = ?;',
      [req.params.id_materias],
      (error, result, field) => {
        conn.release();
        if (error) { return res.status(500).send({ error: error }) }
        
        if (result.length == 0){
          return res.status(404).send({
            mensagem: 'Nao foi encontrado materia com o ID '+ 
            req.params.id_materias
          })
        }

        const response = {
          materia: {
            id_materias: result[0].id_materias,
            nome: result[0].nome,
            creditos: result[0].creditos,
            descricao: result[0].descricao,
            request: {
              tipo: 'GET',
              descricao: 'Retorna todas as materias',
              url: 'http://localhost:3000/materias/' + result[0].id_materias
            }
          }
        }

        res.status(200).send(response);
      }
    )
  });
});

// PACTH
router.patch('/', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error })}
    conn.query(
      `UPDATE base_disciplinas_ufabc
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
      (error, result, fields) => {
        conn.release();
        if (error) { return res.status(500).send({ error: error }) }
        
        const response = {
          mensagem: 'Materia atualizada com sucesso',
          materiaAtualizada:{
              id_materias: req.body.id_materias,
              nome: req.body.nome,
              creditos: req.body.creditos,
              descricao: req.body.descricao,
              request: {
                tipo: 'PACTH',
                descricao: 'Retorna uma materia com ID especifico',
                url: 'http://localhost:3000/materias/' + req.body.id_materias
              }
        }
      }
        return res.status(202).send(response)
      }
    )
  });
});

// DELETE
router.delete('/', (req, res, next) => {
  mysql.getConnection((error, conn) => {
    if (error) { return res.status(500).send({ error: error })}
    conn.query(
      'DELETE FROM base_disciplinas_ufabc WHERE id_materias = ?',
      [req.body.id_materias],
      (error, result, fields) => {
        conn.release();
        if (error) { return res.status(500).send({ error: error }) }

        const response = {
          mensagem: 'Materia removida com sucesso',
          request: {
            tipo: 'DELETE',
            descricao: 'Apaga uma matéria',
            url: 'http://localhost:3000/materias',
            body: {
              id_materias: 'Number'
            }
          }
        }

        res.status(202).send(response);
      }
    )
  });
});

module.exports = router;