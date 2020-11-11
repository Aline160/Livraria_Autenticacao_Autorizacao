const livros= require ("../model/livros");

const getAll = (req,res) => {
  console.log (req.url);
  livros.find(function(err, livros){
    if(err) { 
      res.status(500).send({ message: err.message })
    }
    res.status(200).send(livros);
  })
};

const getByTitulo = (req, res) => {
  const parametros = req.query;
  livros.find(parametros, function (err, livros) {
    if (err) {
        res.status(500).send({ message: err.message })
    } else {
        res.status(200).send(livros)
    }
})
}

const postLivros = (req,res)=>{
  console.log(req.body);

  let livro = new livros(req.body)

livro.save(function(err){
  if(err) { 
    res.status(500).send({ message: err.message })
  }
  res.status(201).send("O livro foi incluído com sucesso")
})

};

const deleteLivros = (req,res)=>{
  const id = req.params.id
  livros.deleteMany({ id }, function(err){
      if (err) {
          res.status(500).send({ message: err.message })
      } else {
          res.status(200).send({ message : "O livro foi removido com sucesso"})
      }
  })
}

const putLivros = (req,res) => {
  const id = req.params.id
  livros.updateMany({ id }, { $set : req.body }, { upsert : true }, function(err){
      if (err) {
          res.status(500).send({ message: err.message })
      } else {
          res.status(200).send({ message : "Livros atualizado com sucesso"})
      }
  })
}


module.exports = {
    getAll,
    getByTitulo,
    postLivros,
    deleteLivros,
    putLivros,
};