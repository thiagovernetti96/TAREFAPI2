const {Client} = require('pg');

const conexao = {
  host: "localhost",
  port: 5432,
  database: "TAREFAPI2",
  user: "postgres",
  password: "1"
}



async function listar() {
  const client = new Client(conexao);
  await client.connect();
  const result = await client.query("SELECT * FROM livros");
  const listaLivros = result.rows;
  await client.end();
  return listaLivros;
}


async function inserir(livro){
  const client = new Client(conexao);
  await client.connect();
  const insercao = await client.query("Insert into livros(nome,autor,editora,ano)" +
  "Values ($1,$2,$3,$4) RETURNING*",[livro.nome,livro.autor,livro.editora,livro.ano])
  const produtoInserido = insercao.rows[0];
  await client.end();
  return produtoInserido;
}


async function buscarPorId(id){
  const client = new Client(conexao);
  await client.connect();
  const busca = await client.query("Select * from livros where id=$1",[id]);
  const resultado = busca.rows[0];
  await client.end();
  return resultado;
}

async function  pesquisarPorEditora(editora){
  const client = new Client(conexao);
  await client.connect();
  const busca = await client.query("Select * from livros where editora=$1", [editora])
  const resultado = busca.rows[0];
  await client.end();
  return resultado;
}

async function  pesquisarPorNome(nome){
  const client = new Client(conexao);
  await client.connect();
  const busca = await client.query("Select * from  livros where nome=$1", [nome])
  const resultado = busca.rows[0];
  await client.end();
  return resultado;
}


async function atualizar(id,livro){
  const client = new Client(conexao);
  await client.connect();
  const sql = 'UPDATE livros set nome=$1, autor=$2, editora=$3,ano=$4 WHERE id=$5 RETURNING *'
  const values = [livro.nome, livro.autor,livro.editora,livro.ano, id];
  const res = await client.query(sql,values);
  const livroAtualizado = res.rows[0];
  await client.end();
  return livroAtualizado;    
}

async function deletar(id) {
  const cliente = new Client(conexao);
  await cliente.connect();
  const sql = await cliente.query('DELETE FROM livros WHERE id=$1 RETURNING *',[id])
  const produtoDeletado = sql.rows[0];
  await cliente.end();
  return produtoDeletado;
}







module.exports = {
  listar,
  inserir,
  buscarPorId,
  atualizar,
  deletar,
  pesquisarPorEditora,
  pesquisarPorNome
}
