const clienteLivroRepository = require('../../repository/clientelivro_repository');

describe('Testes do Repositório', () => {
  it('Retirar livro', async () => {
    const clienteId = 2;
    const livroId = 2;
  
    const livroRetirado = await clienteLivroRepository.retirarLivro(clienteId, livroId);
    expect(livroRetirado).toBeDefined();
    

    if (livroRetirado) {
      expect(livroRetirado.cliente_id).toBe(clienteId);
      expect(livroRetirado.livro_id).toBe(livroId);
      expect(livroRetirado.data_retirada).toBeDefined();
    }
  });


  it('Devolver livro', async () =>{
    const clienteId = 2; 
    const livroId = 2;
  
    await clienteLivroRepository.retirarLivro(clienteId, livroId);
  
    const livroDevolvido = await clienteLivroRepository.devolverLivro(clienteId, livroId);
    expect(livroDevolvido).toBeDefined();
    expect(livroDevolvido.cliente_id).toBe(clienteId);
    expect(livroDevolvido.livro_id).toBe(livroId);
    expect(livroDevolvido.data_retirada).toBeDefined();
  });

})
