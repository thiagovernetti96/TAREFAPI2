const clienteRepository = require('../repository/cliente_repository')

async function listar() {
  return await clienteRepository.listar();
}

async function inserir(cliente) {
    if(cliente && cliente.nome && cliente.matricula && cliente.telefone) {// cliente != undefined
      return await clienteRepository.inserir(cliente);
    }
    else {
      throw {id:400, message:"cliente não possui um dos campos"};
    }
}

async function buscarPorId(id) {
    const cliente = await clienteRepository.buscarPorId(id);
    if(cliente) {
      return cliente;
    }
    else {
      throw {id:404, message:"cliente não encontrado"};
    }
}

async function pesquisarPorEditora(editora){
  const cliente = await clienteRepository.pesquisarPorEditora(editora);
  if(cliente){
    return cliente ; 
  }
  else{
    throw {id:404,message:"cliente não encontrado"}
  }
}

async function pesquisarPorNome(nome){
  const cliente = await clienteRepository.pesquisarPorNome(nome);
  if(cliente){
    return cliente ; 
  }
  else{
    throw {id:404,message:"cliente não encontrado"}
  }
}

async function atualizar(id, clienteAtualizado) {
    const cliente = await clienteRepository.buscarPorId(id);
    if(!cliente) {
      throw {id: 404, message: "cliente não encontrado"};
    }
    
    if(clienteAtualizado && clienteAtualizado.nome && clienteAtualizado.matricula && clienteAtualizado.telefone){
      return await clienteRepository.atualizar(id, clienteAtualizado);
    }
    else {
      throw {id: 400, message: "cliente não possui um dos campos obrigatorios"};
    }
}

async function deletar(id) {
    const clienteDeletado = await clienteRepository.deletar(id);
    if(clienteDeletado){
      return clienteDeletado;
    }
    else {
      throw {id: 404, message: "cliente não encontrado"};
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