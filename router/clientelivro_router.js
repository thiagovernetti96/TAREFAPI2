const express = require('express')
const router = express.Router()
const clienteLivroController = require('../controller/clientelivro_controller')

//router: /api/clientelivros
router.post('/clienteId/livroId',clienteLivroController.retirarLivro);
router.post('/clienteId/livroId',clienteLivroController.devolverLivro);

module.exports = router;