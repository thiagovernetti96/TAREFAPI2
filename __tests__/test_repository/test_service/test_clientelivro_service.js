const clientelivro_service = require('../../../service/clientelivro_service');

describe('Testes de clientelivro_service', () => {
  it('retirarLivro - deve retirar um livro para um cliente', async () => {
    const livroId = 1;
    const clienteId = 2;

    const resultado = await clientelivro_service.retirarLivro(livroId, clienteId);
    expect(resultado).toBeDefined();
  });

  it('devolverLivro - deve devolver um livro para um cliente', async () => {
    const livroId = 1;
    const clienteId = 2;
    const resultado = await clientelivro_service.devolverLivro(livroId, clienteId);
    expect(resultado).toBeDefined();
  });

  it('Tratamento de erro - deve lançar uma exceção quando livroId ou clienteId são incorretos', async () => {
    const livroId = null;
    const clienteId = 2;
    try {
      await clientelivro_service.retirarLivro(livroId, clienteId);
    } catch (error) {
      expect(error.id).toBe(400);
      expect(error.message).toBe('clienteid ou livroid incorretos');
    }
  });
});