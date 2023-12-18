const livroService = require('../service/livro_service')


async function listar(req,res){
  const listaLivros = await livroService.listar();
  res.json(listaLivros);
}


async function inserir(req, res) {
  let livro = req.body;
  try {
    const prodInserido = await livroService.inserir(livro);
    res.status(201).json(prodInserido)
  }
  catch(err) {
    //id-> 400 / msg -> msg de erro
    res.status(err.id).json({msg: err.message});
  }
}

async function buscarPorId(req, res) {
  const id = +req.params.id;
  try {
    const prod = await livroService.buscarPorId(id);
    res.json(prod);
  }
  catch(err) {
    //id-> 404 / msg -> msg de erro
    res.status(err.id).json({msg: err.message});
  }
}


async function pesquisarPorEditora(req, res) {
  const editora = req.params.editora;

  try {
    const livros = await livroService.pesquisarPorEditora(editora);
    res.json(livros);
  } catch (err) {
    res.status(err.id).json({ msg: err.message });
  }
}

async function pesquisarPorNome(req, res) {
  const nome = req.params.nome;
  try {
    const livro = await livroService.pesquisarPorNome(nome);
    res.json(livro);
  }
  catch(err) {
    //id-> 404 / msg -> msg de erro
    res.status(err.id).json({msg: err.message});
  }
}


async function atualizar (req, res) {
  const id = +req.params.id;
  let livro = req.body;

  try{ 
    const livroAtualizado = await livroService.atualizar(id, livro);
    res.json(livroAtualizado);
  }
  catch(err) {
    res.status(err.id).json({msg: err.message});
  }
}

async function deletar(req, res) {
  const id = +req.params.id;
  try { 
    await livroService.deletar(id);
    res.status(204).end();
  } catch (err) {
    res.status(err.id).json({ msg: err.message });
  }   
}

module.exports = {
  listar,
  inserir,
  buscarPorId,
  pesquisarPorEditora,
  pesquisarPorNome,
  atualizar,
  deletar
}