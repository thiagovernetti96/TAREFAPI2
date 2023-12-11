const clienteController = require('../../../controller/cliente_controller');

const clienteService = require('../../../service/cliente_service')


jest.mock('../../../service/cliente_service');

describe('Testes do Controller', () => {


  it('deve retornar uma lista de clientes', async () => {
    // Mock da lista de clientes que será retornada pelo serviço
    const listaclientesMock = [
      { id: 1, nome: 'cliente 1', matricula: 1, telefone:1 },
      { id: 2, nome: 'cliente 2', matricula:1, telefone:1 }
    ];

    // Configurando o mock para retornar a lista simulada
    clienteService.listar.mockResolvedValueOnce(listaclientesMock);

    // Mock para simular o objeto res (response) do Express
    const mockRes = {
      json: jest.fn() // Criando uma função mock para o método json
    };

    // Chamando a função listar diretamente, passando objetos simulados de req e res
    await clienteController.listar({}, mockRes);

    // Verificando se a função json do objeto res foi chamada com a lista simulada
    expect(mockRes.json).toHaveBeenCalledWith(listaclientesMock);
  });

  it('inserir - deve retornar status 201 e o cliente inserido', async () => {
    //criando cliente de teste
    const clienteParaInserir = {
      nome: 'Novo cliente',
      matricula: 1,
      telefone: 1
    };
    // criando status simulado
    const mockResponse = { status: jest.fn(), json: jest.fn() };
    mockResponse.status.mockReturnValue(mockResponse);

    clienteService.inserir.mockResolvedValueOnce(clienteParaInserir);

    // Chamando a função inserir diretamente, passando objetos simulados de req e res
    await clienteController.inserir({ body: clienteParaInserir }, mockResponse);

    // Verifique se a resposta possui o status esperado e o corpo esperado
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(clienteParaInserir);
  });

  it('inserir - deve retornar status de erro e mensagem de erro', async () => {
    const clienteParaInserir = {
      // Informações inválidas para acionar um erro
      nome: 'cliente Inválido',
    };

    const erroMock = { id: 400, message: 'cliente não possui um dos campos' };
    const mockResponse = { status: jest.fn(), json: jest.fn() };
    mockResponse.status.mockReturnValue(mockResponse);

    clienteService.inserir.mockRejectedValueOnce(erroMock);

    // Chame a função inserir diretamente, passando objetos simulados de req e res
    await clienteController.inserir({ body: clienteParaInserir }, mockResponse);

    // Verifique se a resposta possui o status de erro esperado e a mensagem de erro esperada
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ msg: erroMock.message });
  });

  it('deve retornar um cliente pelo ID', async () => {
    // ID simulado para o teste
    const idSimulado = 1;

    // Mock do cliente que será retornado pelo serviço
    const clienteMock = { id: idSimulado, nome: 'cliente Teste',matricula:1, telefone: 1};

    // Configurando o mock para retornar o cliente simulado
    clienteService.buscarPorId.mockResolvedValueOnce(clienteMock);

    // Mock para simular o objeto res (response) do Express
    const mockRes = {
      json: jest.fn(), // Criando uma função mock para o método json
      status: jest.fn() // Criando uma função mock para o método status
    };

    // Mock para simular o objeto req (request) do Express
    const mockReq = {
      params: { id: idSimulado }
    };

    // Chamando a função buscarPorId diretamente, passando objetos simulados de req e res
    await clienteController.buscarPorId(mockReq, mockRes);

    // Verificando se a função json do objeto res foi chamada com o livro simulado
    expect(mockRes.json).toHaveBeenCalledWith(clienteMock);
    // Verificando se a função status do objeto res não foi chamada
    expect(mockRes.status).not.toHaveBeenCalled();
  });

  it('deve retornar status de erro e mensagem de erro', async () => {
    // ID simulado para o teste
    const idSimulado = 2;

    // Mock do erro que será lançado pelo serviço
    const erroMock = { id: 404, message: 'Livro não encontrado' };

    // Configurando o mock para lançar o erro simulado
    clienteService.buscarPorId.mockRejectedValueOnce(erroMock);

    // Mock para simular o objeto res (response) do Express
    const mockRes = {
      json: jest.fn(), // Criando uma função mock para o método json
      status: jest.fn().mockReturnThis() // Criando uma função mock para o método status
    };

    // Mock para simular o objeto req (request) do Express
    const mockReq = {
      params: { id: idSimulado }
    };

    // Chamando a função buscarPorId diretamente, passando objetos simulados de req e res
    await clienteController.buscarPorId(mockReq, mockRes);

    // Verificando se a função status do objeto res foi chamada com o código de status correto
    expect(mockRes.status).toHaveBeenCalledWith(erroMock.id);
    // Verificando se a função json do objeto res foi chamada com a mensagem de erro
    expect(mockRes.json).toHaveBeenCalledWith({ msg: erroMock.message });
  });

  it('deve retornar 200 e atualizar', async () =>{
    const idSimulado = 1
    const clienteMock = { id: idSimulado, nome: 'cliente Teste', matricula: 1, telefone: 1};
    // Configurando o mock para retornar ocliente simulado
   clienteService.atualizar.mockResolvedValueOnce(clienteMock);
     // Mock para simular o objeto res (response) do Express
     const mockRes = {
      json: jest.fn(), // Criando uma função mock para o método json
      status: jest.fn() // Criando uma função mock para o método status
    };

    // Mock para simular o objeto req (request) do Express
    const mockReq = {
      params: { id: idSimulado }
    };

    // Chamando a função buscarPorId diretamente, passando objetos simulados de req e res
    await clienteController.atualizar(mockReq, mockRes);

    // Verificando se a função json do objeto res foi chamada com ocliente simulado
    expect(mockRes.json).toHaveBeenCalledWith(clienteMock);
    // Verificando se a função status do objeto res não foi chamada
    expect(mockRes.status).not.toHaveBeenCalled();
  });

  it('deve retornar status de erro e mensagem de erro da atualização', async () => {
    // Nome simulado para o teste
    const idSimulado = 1;

    // Mock do erro que será lançado pelo serviço
    const erroMock = { id: 404, message: 'cliente não encontrado' };

    // Configurando o mock para lançar o erro simulado
   clienteService.atualizar.mockRejectedValueOnce(erroMock);

    // Mock para simular o objeto res (response) do Express
    const mockRes = {
      json: jest.fn(), // Criando uma função mock para o método json
      status: jest.fn().mockReturnThis() // Criando uma função mock para o método status
    };

    // Mock para simular o objeto req (request) do Express
    const mockReq = {
      params: { id: idSimulado }
    };

    // Chamando a função pesquisarPorNome diretamente, passando objetos simulados de req e res
    await clienteController.atualizar(mockReq, mockRes);

    // Verificando se a função status do objeto res foi chamada com o código de status correto
    expect(mockRes.status).toHaveBeenCalledWith(erroMock.id);
    // Verificando se a função json do objeto res foi chamada com a mensagem de erro
    expect(mockRes.json).toHaveBeenCalledWith({ msg: erroMock.message });
  });

  it('deve retornar 200 e deletar', async () =>{
    const idSimulado = 1
    const clienteMock = { id: idSimulado, nome: 'cliente Teste', matricula: 1, telefone: 1};
    // Configurando o mock para retornar ocliente simulado
   clienteService.deletar.mockResolvedValueOnce(clienteMock);
     // Mock para simular o objeto res (response) do Express
     const mockRes = {
      json: jest.fn(), // Criando uma função mock para o método json
      status: jest.fn() // Criando uma função mock para o método status
    };

    // Mock para simular o objeto req (request) do Express
    const mockReq = {
      params: { id: idSimulado }
    };

    // Chamando a função buscarPorId diretamente, passando objetos simulados de req e res
    await clienteController.deletar(mockReq, mockRes);

    // Verificando se a função json do objeto res foi chamada com ocliente simulado
    expect(mockRes.json).toHaveBeenCalledWith(clienteMock);
    // Verificando se a função status do objeto res não foi chamada
    expect(mockRes.status).not.toHaveBeenCalled();
  });

  it('deve retornar status de erro e mensagem de erro ao deletar', async () => {
    // Nome simulado para o teste
    const idSimulado = 1;

    // Mock do erro que será lançado pelo serviço
    const erroMock = { id: 404, message: 'Cliente não encontrado' };

    // Configurando o mock para lançar o erro simulado
   clienteService.deletar.mockRejectedValueOnce(erroMock);

    // Mock para simular o objeto res (response) do Express
    const mockRes = {
      json: jest.fn(), // Criando uma função mock para o método json
      status: jest.fn().mockReturnThis() // Criando uma função mock para o método status
    };

    // Mock para simular o objeto req (request) do Express
    const mockReq = {
      params: { id: idSimulado }
    };

    // Chamando a função pesquisarPorNome diretamente, passando objetos simulados de req e res
    await clienteController.deletar(mockReq, mockRes);

    // Verificando se a função status do objeto res foi chamada com o código de status correto
    expect(mockRes.status).toHaveBeenCalledWith(erroMock.id);
    // Verificando se a função json do objeto res foi chamada com a mensagem de erro
    expect(mockRes.json).toHaveBeenCalledWith({ msg: erroMock.message });
  }); 

});
