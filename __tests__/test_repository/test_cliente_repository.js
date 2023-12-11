// test_repository.js
const { listar, inserir, buscarPorId, atualizar, deletar } = require('../../repository/cliente_repository'); // ajuste o caminho conforme necessário

describe('Testes do Repositório', () => {

  // Teste para a função listar
  it('listar - deve retornar uma lista de clientes', async () => {
    const resultado = await listar();
    expect(resultado).toBeDefined();
    // Adicione mais asserções conforme necessário
  });

  // Teste para a função inserir
  it('inserir - deve inserir um cliente e retornar o cliente inserido', async () => {
    const clienteParaInserir = {
      nome: 'Nome do cliente',
     matricula: 1,
      telefone: 1
    };
    const resultado = await inserir(clienteParaInserir);
    expect(resultado).toBeDefined();
    // Adicione mais asserções conforme necessário
  });

  it('buscarPorId - deve retornar o cliente correto pelo ID', async () => {
    // Insira alguns clientes fictícios para testar
    const cliente1 = { id:1, nome: 'cliente 1',matricula: 1, telefone:  1 };
    const cliente2 = { id: 2, nome: 'cliente 2',matricula: 1, telefone: 2 };

    // Insira os clientes no banco de dados e obtenha seus IDs
    const cliente1Inserido = await inserir(cliente1);
    const cliente2Inserido = await inserir(cliente2);

    // Chame a função buscarPorId para cada cliente e faça as asserções
    const resultado1 = await buscarPorId(cliente1Inserido.id);
    const resultado2 = await buscarPorId(cliente2Inserido.id);

    // Faça as asserções
    expect(resultado1).toBeDefined();
    expect(resultado1.id).toBe(cliente1Inserido.id);

    expect(resultado2).toBeDefined();
    expect(resultado2.id).toBe(cliente2Inserido.id);
  });
 
  // Teste para a função atualizar
  it('atualizar - deve atualizar um livro pelo ID', async () => {
    // Insira um livro fictício para testar
    const clienteParaAtualizar = { id:1, nome: 'Cliente Atualizar',matricula: 1, telefone: 1};
    const clienteInserido = await inserir(clienteParaAtualizar);

    // Defina os novos dados para o cliente
    const novosDados = { nome: 'cliente Atualizado' ,matricula:2, telefone: 2};

    // Chame a função atualizar para atualizar o cliente
    const clienteAtualizado = await atualizar(clienteInserido.id, novosDados);

    // Faça as asserções
    expect(clienteAtualizado).toBeDefined();
    expect(clienteAtualizado.id).toBe(clienteInserido.id);
    expect(clienteAtualizado.nome).toBe(novosDados.nome);
    expect(clienteAtualizado.matricula).toBe(novosDados.matricula);
    expect(clienteAtualizado.telefone).toBe(novosDados.telefone);

    // Verificando se o cliente foi realmente atualizado (buscando pelo ID e verificando os novos dados)
    const clienteAtualizadoNovamente = await buscarPorId(clienteInserido.id);
    expect(clienteAtualizadoNovamente).toBeDefined();
    expect(clienteAtualizadoNovamente.nome).toBe(novosDados.nome);
    expect(clienteAtualizadoNovamente.matricula).toBe(novosDados.matricula);
    expect(clienteAtualizadoNovamente.telefone).toBe(novosDados.telefone);;
  });

  // Teste para a função deletar
  it('deletar - deve deletar um cliente pelo ID', async () => {
    // Insere um cliente para testar
    const clienteParaDeletar = { nome: 'cliente para Deletar',matricula: 1, telefone: 1};
    const clienteInserido = await inserir(clienteParaDeletar);

    // Chame a função deletar para deletar o livro
    const clienteDeletado = await deletar(clienteInserido.id);

    // Faça as asserções
    expect(clienteDeletado).toBeDefined();
    expect(clienteDeletado.id).toBe(clienteInserido.id);
    // Verifique se o cliente foi realmente removido (buscando pelo ID e esperando que retorne undefined)
    const clienteBuscado = await buscarPorId(clienteInserido.id);
    expect(clienteBuscado).toBeUndefined();
  });
});
