const livroController = require('../../../controller/livro_controller');

const livroService = require('../../../service/livro_service')


jest.mock('../../../service/livro_service');

describe('Testes do Controller', () => {


  it('deve retornar uma lista de livros', async () => {
    // Mock da lista de livros que será retornada pelo serviço
    const listaLivrosMock = [
      { id: 1, nome: 'Livro 1', autor: 'Autor 1', editora: 'Editora 1', ano: 2022 },
      { id: 2, nome: 'Livro 2', autor: 'Autor 2', editora: 'Editora 2', ano: 2023 }
    ];

    // Configurando o mock para retornar a lista simulada
    livroService.listar.mockResolvedValueOnce(listaLivrosMock);

    // Mock para simular o objeto res (response) do Express
    const mockRes = {
      json: jest.fn() // Criando uma função mock para o método json
    };

    // Chamando a função listar diretamente, passando objetos simulados de req e res
    await livroController.listar({}, mockRes);

    // Verificando se a função json do objeto res foi chamada com a lista simulada
    expect(mockRes.json).toHaveBeenCalledWith(listaLivrosMock);
  });

  it('inserir - deve retornar status 201 e o livro inserido', async () => {
    //criando livro de teste
    const livroParaInserir = {
      nome: 'Novo Livro',
      editora: 'Editora Nova',
      autor: 'Novo Autor',
      ano: 2023
    };
    // criando status simulado
    const mockResponse = { status: jest.fn(), json: jest.fn() };
    mockResponse.status.mockReturnValue(mockResponse);

    livroService.inserir.mockResolvedValueOnce(livroParaInserir);

    // Chamando a função inserir diretamente, passando objetos simulados de req e res
    await livroController.inserir({ body: livroParaInserir }, mockResponse);

    // Verifique se a resposta possui o status esperado e o corpo esperado
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(livroParaInserir);
  });

  it('inserir - deve retornar status de erro e mensagem de erro', async () => {
    const livroParaInserir = {
      // Informações inválidas para acionar um erro
      nome: 'Livro Inválido',
    };

    const erroMock = { id: 400, message: 'Livro não possui nome ou preco' };
    const mockResponse = { status: jest.fn(), json: jest.fn() };
    mockResponse.status.mockReturnValue(mockResponse);

    livroService.inserir.mockRejectedValueOnce(erroMock);

    // Chame a função inserir diretamente, passando objetos simulados de req e res
    await livroController.inserir({ body: livroParaInserir }, mockResponse);

    // Verifique se a resposta possui o status de erro esperado e a mensagem de erro esperada
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ msg: erroMock.message });
  });

  it('deve retornar um livro pelo ID', async () => {
    // ID simulado para o teste
    const idSimulado = 1;

    // Mock do livro que será retornado pelo serviço
    const livroMock = { id: idSimulado, nome: 'Livro Teste', autor: 'Autor Teste', editora: 'Editora Teste', ano: 2022 };

    // Configurando o mock para retornar o livro simulado
    livroService.buscarPorId.mockResolvedValueOnce(livroMock);

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
    await livroController.buscarPorId(mockReq, mockRes);

    // Verificando se a função json do objeto res foi chamada com o livro simulado
    expect(mockRes.json).toHaveBeenCalledWith(livroMock);
    // Verificando se a função status do objeto res não foi chamada
    expect(mockRes.status).not.toHaveBeenCalled();
  });

  it('deve retornar status de erro e mensagem de erro', async () => {
    // ID simulado para o teste
    const idSimulado = 2;

    // Mock do erro que será lançado pelo serviço
    const erroMock = { id: 404, message: 'Livro não encontrado' };

    // Configurando o mock para lançar o erro simulado
    livroService.buscarPorId.mockRejectedValueOnce(erroMock);

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
    await livroController.buscarPorId(mockReq, mockRes);

    // Verificando se a função status do objeto res foi chamada com o código de status correto
    expect(mockRes.status).toHaveBeenCalledWith(erroMock.id);
    // Verificando se a função json do objeto res foi chamada com a mensagem de erro
    expect(mockRes.json).toHaveBeenCalledWith({ msg: erroMock.message });
  });

  it('deve retornar um livro pela Editora', async () => {
    // Editora simulad para o teste
    const editoraSimulada = 'Editora teste';

    // Mock do livro que será retornado pelo serviço
    const livroMock = { id: 1, nome: 'Livro Teste', autor: 'Autor Teste', editora: editoraSimulada, ano: 2022 };

    // Configurando o mock para retornar o livro simulado
    livroService.pesquisarPorEditora.mockResolvedValueOnce(livroMock);

    // Mock para simular o objeto res (response) do Express
    const mockRes = {
      json: jest.fn(), // Criando uma função mock para o método json
      status: jest.fn() // Criando uma função mock para o método status
    };

    // Mock para simular o objeto req (request) do Express
    const mockReq = {
      params: { editora: editoraSimulada }
    };

    // Chamando a função buscarPorId diretamente, passando objetos simulados de req e res
    await livroController.pesquisarPorEditora(mockReq, mockRes);

    // Verificando se a função json do objeto res foi chamada com o livro simulado
    expect(mockRes.json).toHaveBeenCalledWith(livroMock);
    // Verificando se a função status do objeto res não foi chamada
    expect(mockRes.status).not.toHaveBeenCalled();
  });

  it('deve retornar status de erro e mensagem de erro da editora', async () => {
    // Editora simulada para o teste
    const editoraSimulada = 'editora teste';

    // Mock do erro que será lançado pelo serviço
    const erroMock = { id: 404, message: 'Livro não encontrado' };

    // Configurando o mock para lançar o erro simulado
    livroService.pesquisarPorEditora.mockRejectedValueOnce(erroMock);

    // Mock para simular o objeto res (response) do Express
    const mockRes = {
      json: jest.fn(), // Criando uma função mock para o método json
      status: jest.fn().mockReturnThis() // Criando uma função mock para o método status
    };

    // Mock para simular o objeto req (request) do Express
    const mockReq = {
      params: { editora: editoraSimulada }
    };

    // Chamando a função pesquisarPorEditora diretamente, passando objetos simulados de req e res
    await livroController.pesquisarPorEditora(mockReq, mockRes);

    // Verificando se a função status do objeto res foi chamada com o código de status correto
    expect(mockRes.status).toHaveBeenCalledWith(erroMock.id);
    // Verificando se a função json do objeto res foi chamada com a mensagem de erro
    expect(mockRes.json).toHaveBeenCalledWith({ msg: erroMock.message });
  });

  it('deve retornar um livro pelo nome', async () => {
    // Editora simulad para o teste
    const nomeSimulado = 'Nome teste';

    // Mock do livro que será retornado pelo serviço
    const livroMock = { id: 1, nome: nomeSimulado, autor: 'Autor Teste', editora: 'teste', ano: 2022 };

    // Configurando o mock para retornar o livro simulado
    livroService.pesquisarPorNome.mockResolvedValueOnce(livroMock);

    // Mock para simular o objeto res (response) do Express
    const mockRes = {
      json: jest.fn(), // Criando uma função mock para o método json
      status: jest.fn() // Criando uma função mock para o método status
    };

    // Mock para simular o objeto req (request) do Express
    const mockReq = {
      params: { nome: nomeSimulado }
    };

    // Chamando a função buscarPorId diretamente, passando objetos simulados de req e res
    await livroController.pesquisarPorNome(mockReq, mockRes);

    // Verificando se a função json do objeto res foi chamada com o livro simulado
    expect(mockRes.json).toHaveBeenCalledWith(livroMock);
    // Verificando se a função status do objeto res não foi chamada 
    expect(mockRes.status).not.toHaveBeenCalled();
  });

  it('deve retornar status de erro e mensagem de erro do nome', async () => {
    // Nome simulado para o teste
    const nomeSimulado = 'nome teste';

    // Mock do erro que será lançado pelo serviço
    const erroMock = { id: 404, message: 'Livro não encontrado' };

    // Configurando o mock para lançar o erro simulado
    livroService.pesquisarPorNome.mockRejectedValueOnce(erroMock);

    // Mock para simular o objeto res (response) do Express
    const mockRes = {
      json: jest.fn(), // Criando uma função mock para o método json
      status: jest.fn().mockReturnThis() // Criando uma função mock para o método status
    };

    // Mock para simular o objeto req (request) do Express
    const mockReq = {
      params: { nome: nomeSimulado }
    };

    // Chamando a função pesquisarPorNome diretamente, passando objetos simulados de req e res
    await livroController.pesquisarPorNome(mockReq, mockRes);

    // Verificando se a função status do objeto res foi chamada com o código de status correto
    expect(mockRes.status).toHaveBeenCalledWith(erroMock.id);
    // Verificando se a função json do objeto res foi chamada com a mensagem de erro
    expect(mockRes.json).toHaveBeenCalledWith({ msg: erroMock.message });
  });

  it('deve retornar 200 e atualizar', async () =>{
    const idSimulado = 1
    const livroMock = { id: idSimulado, nome: 'Livro Teste', autor: 'Autor Teste', editora: 'editora teste', ano: 2022 };
    // Configurando o mock para retornar o livro simulado
    livroService.atualizar.mockResolvedValueOnce(livroMock);
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
    await livroController.atualizar(mockReq, mockRes);

    // Verificando se a função json do objeto res foi chamada com o livro simulado
    expect(mockRes.json).toHaveBeenCalledWith(livroMock);
    // Verificando se a função status do objeto res não foi chamada
    expect(mockRes.status).not.toHaveBeenCalled();
  });

  it('deve retornar status de erro e mensagem de erro da atualização', async () => {
    // Nome simulado para o teste
    const idSimulado = 1;

    // Mock do erro que será lançado pelo serviço
    const erroMock = { id: 404, message: 'Livro não encontrado' };

    // Configurando o mock para lançar o erro simulado
    livroService.atualizar.mockRejectedValueOnce(erroMock);

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
    await livroController.atualizar(mockReq, mockRes);

    // Verificando se a função status do objeto res foi chamada com o código de status correto
    expect(mockRes.status).toHaveBeenCalledWith(erroMock.id);
    // Verificando se a função json do objeto res foi chamada com a mensagem de erro
    expect(mockRes.json).toHaveBeenCalledWith({ msg: erroMock.message });
  });

  it('deve retornar 200 e deletar', async () =>{
    const idSimulado = 1
    const livroMock = { id: idSimulado, nome: 'Livro Teste', autor: 'Autor Teste', editora: 'editora teste', ano: 2022 };
    // Configurando o mock para retornar o livro simulado
    livroService.deletar.mockResolvedValueOnce(livroMock);
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
    await livroController.deletar(mockReq, mockRes);

    // Verificando se a função json do objeto res foi chamada com o livro simulado
    expect(mockRes.json).toHaveBeenCalledWith(livroMock);
    // Verificando se a função status do objeto res não foi chamada
    expect(mockRes.status).not.toHaveBeenCalled();
  });

  it('deve retornar status de erro e mensagem de erro ao deletar', async () => {
    // Nome simulado para o teste
    const idSimulado = 1;

    // Mock do erro que será lançado pelo serviço
    const erroMock = { id: 404, message: 'Livro não encontrado' };

    // Configurando o mock para lançar o erro simulado
    livroService.deletar.mockRejectedValueOnce(erroMock);

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
    await livroController.deletar(mockReq, mockRes);

    // Verificando se a função status do objeto res foi chamada com o código de status correto
    expect(mockRes.status).toHaveBeenCalledWith(erroMock.id);
    // Verificando se a função json do objeto res foi chamada com a mensagem de erro
    expect(mockRes.json).toHaveBeenCalledWith({ msg: erroMock.message });
  }); 

});
