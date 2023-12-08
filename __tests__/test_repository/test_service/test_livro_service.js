
const {
  listar,
  inserir,
  buscarPorId,
  pesquisarPorEditora,
  pesquisarPorNome,
  atualizar,
  deletar,
} = require('../../../service/livro_service');

const livroRepository = require('../../../repository/livro_repository')

describe('Testes do Repositório', () => {

  //teste listar//
  it('Deve listar os livros', async () => {
    // Rodando a função
    const resultado = await listar()
    // Testando se o retorno é definido
    expect(resultado).toBeDefined();
  });

  //teste inserir
  it('Deve inserir novos livros',async() => {
    //criando um livro para inserir
    const livro1 = {nome:'livro1',editora:'editora1',autor:'autor1',ano: 1};
    // rodando a função
    const livroInserido = await inserir(livro1);
    // Verificando se o retorno é definido
    expect(livroInserido).toBeDefined();
  })
  // teste buscar por id
  it('Deve buscar por id', async() => {
    //criando um livro para inserir
    const id = 1
    const livro1 = {id,nome:'livro1',editora:'editora1',autor:'autor1',ano: 1};
    // rodando a inserção
    const livroInserido = await inserir(livro1)
    // rodando busca
    await livroRepository.buscarPorId(livroInserido);
    // resultado
    const resultado = await buscarPorId(id);
    // verificando se o retorno é definido
    expect(resultado).toBeDefined();
  })

  //teste para buscar por editora
  it('Deve buscar por editora',async() =>{
      //criando um livro para inserir
      const editora = 'editora 1'
      const livro1 = {id:1,nome:'livro1',editora,autor:'autor1',ano: 1};
      const livroInserido = await inserir(livro1);
      // rodando a inserção
      // rodando busca
      await livroRepository.pesquisarPorEditora(livroInserido);
      // resultado
      const resultado = await pesquisarPorEditora(editora);
      // verificando se o retorno é definido
      expect(resultado).toBeDefined();
  })

  it('Deve pesquisar pelo nome',async() =>{
    //criando um livro para inserir
    const nome = 'aventuras de serjão'
    const livro1 = {nome: nome ,editora:'editora1',autor:'autor1',ano: 1};
    //inserindo livro 
    const livroInserido = await inserir(livro1);
    //rodando a função
    await livroRepository.pesquisarPorNome(livroInserido);
    const busca = await pesquisarPorNome(nome);
    //verificando se o retorno é definido
    expect(busca).toBeDefined();
  })

  it('Deve atualizar',async() =>{
    //criando um livro para inserir
    const id = 1
    const livro1 = {id,nome:'livro1',editora:'editora1',autor:'autor1',ano: 1};
    //inserindo livro 
    const livroInserido = await inserir(livro1);
    // buscando livro
    await livroRepository.buscarPorId(livroInserido)
    const buscar = await buscarPorId(id)
    //rodando a função
    await livroRepository.atualizar(buscar)
    const atualiza = await atualizar(buscar);
    //verificando se o retorno é definido
    expect(atualiza).toBeDefined();
  })

  it('Deve deletar',async() =>{
    //criando um livro para inserir
    const livro1 = {nome:'livro1',editora:'editora1',autor:'autor1',ano: 1};
    //inserindo livro 
    const livroInserido = await inserir(livro1);
    //rodando a função
    const deleta = await deletar(livroInserido)
    //verificando se o retorno é definido
    expect(deleta).toBeDefined();
  })


});