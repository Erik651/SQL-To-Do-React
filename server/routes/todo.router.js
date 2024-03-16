const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET
router.get('/', (req, res) => {
  let queryText = `SELECT * FROM "tasks";`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log('ERROR in the GET route', error);
      res.sendStatus(500);
    });
});
// POST
router.post('/', (req, res) => {
  console.log('req.body', req.body);
  let queryText = `INSERT INTO "tasks" (
    "taskName")
    VALUES ($1);
  `;
  pool
    .query(queryText, [req.body.taskName])
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log('ERROR in POST/tasks', error);
      res.sendStatus(500);
    });
});
// PUT
router.put('/:id', (req, res) => {
  console.log('req.body', req.body);
  console.log('req.params', req.params);
  let queryText = `
  UPDATE "tasks" SET "isCompleted" = NOT "isCompleted"
  WHERE "id" = $2;
  `;
  pool
    .query(queryText, [req.body.taskName, req.params.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('ERROR in the PUT /tasks/:id', error);
      res.sendStatus(500);
    });
});
// DELETE
router.delete('/:id', (req, res) => {
  console.log('req.params', req.params);
  let queryText = `DELETE FROM "tasks" WHERE "id" = $1;`;
  pool
    .query(queryText, [req.params.id])
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log('ERROR in the DELETE /tasks/:id', error);
      res.sendStatus(500);
    });
});

module.exports = router;
