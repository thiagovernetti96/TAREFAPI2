// test_repository.js
const { listar, inserir, buscarPorId, pesquisarPorEditora, pesquisarPorNome, atualizar, deletar } = require('../../repository/livro_repository'); // ajuste o caminho conforme necessário

describe('Testes do Repositório', () => {

  // Teste para a função listar
  it('listar - deve retornar uma lista de livros', async () => {
    const resultado = await listar();
    expect(resultado).toBeDefined();
    // Adicione mais asserções conforme necessário
  });

  // Teste para a função inserir
  it('inserir - deve inserir um livro e retornar o livro inserido', async () => {
    const livroParaInserir = {
      nome: 'Nome do Livro',
      autor: 'Autor do Livro',
      editora: 'Editora do Livro',
      ano: 2022,
    };
    const resultado = await inserir(livroParaInserir);
    expect(resultado).toBeDefined();
    // Adicione mais asserções conforme necessário
  });

  it('buscarPorId - deve retornar o livro correto pelo ID', async () => {
    // Insira alguns livros fictícios para testar
    const livro1 = { id:1, nome: 'Livro 1', autor: 'Autor 1', editora: 'Editora 1', ano: 2022 };
    const livro2 = { id: 2, nome: 'Livro 2', autor: 'Autor 2', editora: 'Editora 2', ano: 2023 };

    // Insira os livros no banco de dados e obtenha seus IDs
    const livro1Inserido = await inserir(livro1);
    const livro2Inserido = await inserir(livro2);

    // Chame a função buscarPorId para cada livro e faça as asserções
    const resultado1 = await buscarPorId(livro1Inserido.id);
    const resultado2 = await buscarPorId(livro2Inserido.id);

    // Faça as asserções
    expect(resultado1).toBeDefined();
    expect(resultado1.id).toBe(livro1Inserido.id);

    expect(resultado2).toBeDefined();
    expect(resultado2.id).toBe(livro2Inserido.id);
  });

  // Teste para a função pesquisarPorEditora
  it('pesquisarPorEditora - deve retornar um livro pela editora', async () => {
    //Inserção de livros para testar a busca
    const livro1 = { id: 1 ,nome: 'Livro 1', autor: 'Autor 1', editora: 'Editora 1', ano: 2022 };
    const livro2 = { id: 2 ,nome: 'Livro 2', autor: 'Autor 2', editora: 'Editora 2', ano: 2023 };
    const livro3 = { id: 3 ,nome: 'Livro 3', autor: 'Autor 3', editora: 'Editora 2', ano: 2021 };
    const livro1Inserido = await inserir(livro1);
    const livro2Inserido = await inserir(livro2);
    const livro3Inserido = await inserir(livro3);
    const resultado1 = await pesquisarPorEditora(livro1Inserido.editora);
    const resultado2 = await pesquisarPorEditora(livro2Inserido.editora);
    const resultado3 = await pesquisarPorEditora(livro2Inserido.editora);
    //Testar se o resultado das buscas não dá undefined
    expect(resultado1).toBeDefined();
    expect(resultado2).toBeDefined();
    expect(resultado3).toBeDefined();
    //Testar se busca por editora
    expect(resultado1.editora).toBe(livro1Inserido.editora)
    expect(resultado2.editora).toBe(livro2Inserido.editora)
    expect(resultado3.editora).toBe(livro3Inserido.editora)
  });

  // Teste para a função pesquisarPorNome
  it('pesquisarPorNome - deve retornar um livro pelo nome', async () => {
    // criação de livros
    constlivro1 = {id:1, nome:'Livro 1', autor:'Autor 1', editora: 'Editora 1', ano: 2020};
    constlivro2 = {id:2, nome: 'Livro 2', autor: 'Autor 2', editora: 'Editora 2', ano:1984};
    // inserção de livros
    livro1Inserido = await inserir(constlivro1);
    livro2Inserido = await inserir(constlivro2);
    // gerando busca
    resultado1 = await pesquisarPorNome(livro1Inserido.nome)
    resultado2 = await pesquisarPorNome(livro2Inserido.nome)
    // testes de undefined
    expect(resultado1).toBeDefined();
    expect(resultado2).toBeDefined();
    // testar busca por nome
    expect(resultado1.nome).toBe(livro1Inserido.nome);
    expect(resultado2.nome).toBe(livro2Inserido.nome);
  });

  // Teste para a função atualizar
  it('atualizar - deve atualizar um livro pelo ID', async () => {
    // Insira um livro fictício para testar
    const livroParaAtualizar = { id:1, nome: 'Livro para Atualizar', autor: 'Autor', editora: 'Editora', ano: 2022 };
    const livroInserido = await inserir(livroParaAtualizar);

    // Defina os novos dados para o livro
    const novosDados = { nome: 'Livro Atualizado', autor: 'Novo Autor', editora: 'Nova Editora', ano: 2023 };

    // Chamando a função atualizar para atualizar o livro
    const livroAtualizado = await atualizar(livroInserido.id, novosDados);

    // Faça as asserções
    expect(livroAtualizado).toBeDefined();
    expect(livroAtualizado.id).toBe(livroInserido.id);
    expect(livroAtualizado.nome).toBe(novosDados.nome);
    expect(livroAtualizado.autor).toBe(novosDados.autor);
    expect(livroAtualizado.editora).toBe(novosDados.editora);
    expect(livroAtualizado.ano).toBe(novosDados.ano);

    // Verificando se o livro foi realmente atualizado (buscando pelo ID e verificando os novos dados)
    const livroAtualizadoNovamente = await buscarPorId(livroInserido.id);
    expect(livroAtualizadoNovamente).toBeDefined();
    expect(livroAtualizadoNovamente.nome).toBe(novosDados.nome);
    expect(livroAtualizadoNovamente.autor).toBe(novosDados.autor);
    expect(livroAtualizadoNovamente.editora).toBe(novosDados.editora);
    expect(livroAtualizadoNovamente.ano).toBe(novosDados.ano);
  });

  // Teste para a função deletar
  it('deletar - deve deletar um livro pelo ID', async () => {
    // Insere um livro para testar
    const livroParaDeletar = { nome: 'Livro para Deletar', autor: 'Autor', editora: 'Editora', ano: 2022 };
    const livroInserido = await inserir(livroParaDeletar);

    // Chamando a função deletar para deletar o livro
    const livroDeletado = await deletar(livroInserido.id);

    // Faça as asserções
    expect(livroDeletado).toBeDefined();
    expect(livroDeletado.id).toBe(livroInserido.id);
    // Verificando  se o livro foi realmente removido (buscando pelo ID e esperando que retorne undefined)
    const livroBuscado = await buscarPorId(livroInserido.id);
    expect(livroBuscado).toBeUndefined();
  });
});
