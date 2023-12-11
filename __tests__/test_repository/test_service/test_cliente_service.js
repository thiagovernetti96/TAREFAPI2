
const {
  listar,
  inserir,
  buscarPorId,
  atualizar,
  deletar,
} = require('../../../service/cliente_service');

const clienteRepository = require('../../../repository/cliente_repository')

describe('Testes do Repositório', () => {

  //teste listar//
  it('Deve listar os clientes', async () => {
    // Rodando a função
    const resultado = await listar()
    // Testando se o retorno é definido
    expect(resultado).toBeDefined();
  });

  //teste inserir
  it('Deve inserir novos clientes',async() => {
    //criando um cliente para inserir
    const cliente1 = {nome:'cliente1',matricula:1,telefone: 1};
    // rodando a função
    const clienteInserido = await inserir(cliente1);
    // Verificando se o retorno é definido
    expect(clienteInserido).toBeDefined();
  })
  // teste buscar por id
  it('Deve buscar por id', async() => {
    //criando um cliente para inserir
    const id = 1
    const cliente1 = {id,nome:'cliente1',matricula:1,telefone:1};
    // rodando a inserção
    const clienteInserido = await inserir(cliente1)
    // rodando busca
    await clienteRepository.buscarPorId(clienteInserido);
    // resultado
    const resultado = await buscarPorId(id);
    // verificando se o retorno é definido
    expect(resultado).toBeDefined();
  })

  it('Deve atualizar',async() =>{
    //criando um cliente para inserir
    const id = 1
    const cliente1 = {id,nome:'cliente1',matricula:1,telefone:1};
    //inserindo cliente 
    const clienteInserido = await inserir(cliente1);
    // buscando cliente
    await clienteRepository.buscarPorId(clienteInserido)
    const buscar = await buscarPorId(id)
    //rodando a função
    await clienteRepository.atualizar(buscar)
    const atualiza = await atualizar(buscar);
    //verificando se o retorno é definido
    expect(atualiza).toBeDefined();
  })

  it('Deve deletar',async() =>{
    //criando um cliente para inserir
    const cliente1 = {nome:'cliente1',matricula:1,telefone:1};
    //inserindo cliente 
    const clienteInserido = await inserir(cliente1);
    //rodando a função
    const deleta = await deletar(clienteInserido)
    //verificando se o retorno é definido
    expect(deleta).toBeDefined();
  })


});