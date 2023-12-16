const clientelivro_repository = require('../repository/clientelivro_repository')

async function retirarLivro(livroId,clienteId){
  if(livroId && clienteId){
   return await clientelivro_repository.retirarLivro(livroId,clienteId);
  }
  else{
    throw {id:400, message:"clienteid ou livroid incorretos"};
  }
}


async function devolverLivro(livroId,clienteId){
  if(livroId && clienteId){
    return await clientelivro_repository.devolverLivro(livroId,clienteId);
  }
  else{
    throw {id:400, message:"clienteid ou livroid incorretos"};
  }
}




module.exports={
  retirarLivro,
  devolverLivro
}