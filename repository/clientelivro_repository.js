livroRepository = require('../repository/livro_repository')
clienteRepository = require('../repository/cliente_repository')
const {Client} = require('pg');

const conexao = {
  host: "localhost",
  port: 5432,
  database: "TAREFAPI2",
  user: "postgres",
  password: "1"
}

async function retirarLivro(clienteId,livroId){
  const client = new Client(conexao);
  await client.connect();
  const livro = await livroRepository.buscarPorId(livroId);
  const cliente = await clienteRepository.buscarPorId(clienteId)
  if(livro &&  cliente){
    const dataRetirada = new Date( );
    const sql = `
      INSERT INTO cliente_livro (cliente_id, livro_id, data_retirada)
      VALUES ($1, $2, $3)
      RETURNING *;
      `
      const values = [clienteId, livroId, dataRetirada];
      const result = await client.query(sql, values);
      const livroRetirado = result.rows[0];
      await client.end();
      return livroRetirado;
      
  }
  else{
    await client.end();
  }  
}


async function devolverLivro(clienteId, livroId) {
  const client = new Client(conexao);
  await client.connect();

  // Remove a relação na tabela intermediária
  const sqlRemoveRelacao = `
    DELETE FROM cliente_livro
    WHERE cliente_id = $1 AND livro_id = $2
    RETURNING *;
  `;
  const valuesRemoveRelacao = [clienteId, livroId];
  const resultRemoveRelacao = await client.query(sqlRemoveRelacao, valuesRemoveRelacao);

  await client.end();

  return resultRemoveRelacao.rows[0];
}








module.exports = {
  retirarLivro,
  devolverLivro,
}