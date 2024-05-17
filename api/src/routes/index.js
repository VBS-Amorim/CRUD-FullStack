//Descrição: arquivo responsável pela chamada da Api da aplicação.

const express = require('express');
const router = express.Router();
router.get('/api', (req, res) => {
  res.status(200).send({
    success: 'true',
    message: 'funcionou!',
    version: '1.0.0',
  });
});
module.exports = router;