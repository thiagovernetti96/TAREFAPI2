

const clientelivro_repository = require('../repository/clientelivro_repository');

async function retirarLivro(clientelivro) {
  if (clientelivro.livroId && clientelivro.clienteId) {
    return clientelivro_repository.retirarLivro(clientelivro.livroId, clientelivro.clienteId);
  } else {
    throw { id: 400, message: 'clienteid ou livroid incorretos' };
  }
}

async function devolverLivro(clientelivro) {
  if (clientelivro.livroId && clientelivro.clienteId) {
    return clientelivro_repository.devolverLivro(clientelivro.livroId, clientelivro.clienteId);
  } else {
    throw { id: 400, message: 'clienteid ou livroid incorretos' };
  }
}

module.exports = {
  retirarLivro,
  devolverLivro,
};
