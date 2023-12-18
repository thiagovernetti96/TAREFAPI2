const express = require('express')
const livroRouter = require('./router/livro_router');
const clienteRoter = require('./router/cliente_router')
const clienteLivroRouter = require('./router/clientelivro_router')

const app = express()
const port = 3000

app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
})

app.use('/api/livros', livroRouter);
app.use('/api/clientes',clienteRoter)
app.use('api/clientelivros',clienteLivroRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})