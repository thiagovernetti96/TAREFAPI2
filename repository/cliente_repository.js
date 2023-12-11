const {Client} = require('pg');

const conexao = {
  host: "localhost",
  port: 5432,
  database: "TAREFAPI2",
  user: "postgres",
  password: "1"
}

const livroService = require('../repository/livro_repository')

async function listar() {
  const client = new Client(conexao);
  await client.connect();
  const result = await client.query("SELECT * FROM clientes");
  const listaClientes = result.rows;
  await client.end();
  return listaClientes;
}


async function inserir(cliente){
  const client = new Client(conexao);
  await client.connect();
  const insercao = await client.query("Insert into clientes(nome,matricula,telefone)" +
  "Values ($1,$2,$3) RETURNING*",[cliente.nome,cliente.matricula,cliente.telefone])
  const clienteInserido = insercao.rows[0];
  await client.end();
  return clienteInserido;
}


async function buscarPorId(id){
  const client = new Client(conexao);
  await client.connect();
  const busca = await client.query("Select * from clientes where id=$1",[id]);
  const resultado = busca.rows[0];
  await client.end();
  return resultado;
}

async function atualizar(id,cliente){
  const client = new Client(conexao);
  await client.connect();
  const sql = 'UPDATE clientes set nome=$1, matricula=$2, telefone=$3 WHERE id=$4 RETURNING *'
  const values = [cliente.nome, cliente.matricula,cliente.telefone, id];
  const res = await client.query(sql,values);
  const clienteAtualizado = res.rows[0];
  await client.end();
  return clienteAtualizado;    
}


async function deletar(id) {
  const cliente = new Client(conexao);
  await cliente.connect();
  const sql = await cliente.query('DELETE FROM clientes WHERE id=$1 RETURNING *',[id])
  const clienteDeletado = sql.rows[0];
  await cliente.end();
  return clienteDeletado;
}


module.exports = {
  listar,
  inserir,
  buscarPorId,
  atualizar,
  deletar  
}