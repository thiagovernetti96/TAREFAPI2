const clienteLivroService = require('../../../service/clientelivro_service');

describe('Testes do Controller', () => {
  it('Retirar Livro', async () => {
    const req = {
      body: {
        livroId: 140,
        clienteId: 60,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await clienteLivroService.retirarLivro(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });

  it('Devolver Livro', async () => {
    const req = {
      body: {
        livroId: 140,
        clienteId: 60,
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await clienteLivroService.devolverLivro(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });
});
