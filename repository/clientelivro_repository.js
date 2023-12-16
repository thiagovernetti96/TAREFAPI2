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

async function retirarLivro(clienteId, livroId) {
  const client = new Client(conexao);
  await client.connect();

  const sqlCheckRelacao = `
    SELECT * FROM cliente_livro
    WHERE cliente_id = $1 AND livro_id = $2;
  `;
  const valuesCheckRelacao = [clienteId, livroId];
  const resultCheckRelacao = await client.query(sqlCheckRelacao, valuesCheckRelacao);

  if (resultCheckRelacao.rows.length === 0) {
    const dataRetirada = new Date();
    const sqlInsertRelacao = `
      INSERT INTO cliente_livro (cliente_id, livro_id, data_retirada)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const valuesInsertRelacao = [clienteId, livroId, dataRetirada];
    const resultInsertRelacao = await client.query(sqlInsertRelacao, valuesInsertRelacao);

    await client.end();

    return resultInsertRelacao.rows[0];
  }

  await client.end();
  return null;
}


async function devolverLivro(clienteId, livroId) {
  const client = new Client(conexao);
  await client.connect();

  const sqlCheckRelacao = `
    SELECT * FROM cliente_livro
    WHERE cliente_id = $1 AND livro_id = $2;
  `;
  const valuesCheckRelacao = [clienteId, livroId];
  const resultCheckRelacao = await client.query(sqlCheckRelacao, valuesCheckRelacao);

  if (resultCheckRelacao.rows.length > 0) {
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

  await client.end();
  return null;
}








module.exports = {
  retirarLivro,
  devolverLivro,
}