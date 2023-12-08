const livroRepository = require('../repository/livro_repository')

async function listar() {
  return await livroRepository.listar();
}

async function inserir(livro) {
    if(livro && livro.nome && livro.editora && livro.autor && livro.ano) {// livro != undefined
      return await livroRepository.inserir(livro);
    }
    else {
        throw {id:400, message:"Livro nao possui nome ou preco"};
    }
}

async function buscarPorId(id) {
    const livro = await livroRepository.buscarPorId(id);
    if(livro) {
        return livro;
    }
    else {
        throw {id:404, message:"Livro não encontrado"};
    }
}

async function pesquisarPorEditora(editora){
  const livro = await livroRepository.pesquisarPorEditora(editora);
  if(livro){
    return livro ; 
  }
  else{
    throw {id:404,message:"Livro não encontrado"}
  }
}

async function pesquisarPorNome(nome){
  const livro = await livroRepository.pesquisarPorNome(nome);
  if(livro){
    return livro ; 
  }
  else{
    throw {id:404,message:"Livro não encontrado"}
  }
}

async function atualizar(id, livroAtualizado) {
    const livro = await livroRepository.buscarPorId(id);
    if(!livro) {
        throw {id: 404, message: "Livro não encontrado"};
    }
    
    if(livroAtualizado && livroAtualizado.nome && livroAtualizado.editora && livroAtualizado.autor && livroAtualizado.ano){
        return await livroRepository.atualizar(id, livroAtualizado);
    }
    else {
        throw {id: 400, message: "Livro não possui um dos campos obrigatorios"};
    }
}

async function deletar(id) {
    const livroDeletado = await livroRepository.deletar(id);
    if(livroDeletado){
        return livroDeletado;
    }
    else {
        throw {id: 404, message: "Livro não encontrado"};
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