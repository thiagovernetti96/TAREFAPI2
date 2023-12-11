const express = require('express')
const router = express.Router()
const clienteController = require('../controller/cliente_controller')

//router: /api/clientes
router.get('/', clienteController.listar);
router.post('/', clienteController.inserir);
router.get('/:id', clienteController.buscarPorId);
router.put('/:id', clienteController.atualizar);
router.delete('/:id', clienteController.deletar);

module.exports = router;