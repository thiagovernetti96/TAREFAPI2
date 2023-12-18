const clienteLivroService = require('../service/clientelivro_service');

async function retirarLivro(req, res) {
  try {
    const { livroId, clienteId } = req.body;
    const clienteLivroRetirado = await clienteLivroService.retirarLivro(livroId, clienteId);
    res.status(201).json(clienteLivroRetirado);
  } catch (err) {
    res.status(err.id || 500).json({ msg: err.message });
  }
}

async function devolverLivro(req, res) {
  try {
    const { livroId, clienteId } = req.body;
    const clienteLivroDevolvido = await clienteLivroService.devolverLivro(livroId, clienteId);
    res.status(201).json(clienteLivroDevolvido);
  } catch (err) {
    res.status(err.id || 500).json({ msg: err.message });
  }
}

module.exports = {
  retirarLivro,
  devolverLivro,
};

