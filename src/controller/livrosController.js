const livros= require ("../model/livros");
const SECRET = process.env.SECRET;
const jwt = require('jsonwebtoken');

const getAll = (req,res) => {

  const authHeader = req.get('authorization');

  if (!authHeader) {
    return res.status(401).send('Tô de Olho! Cadê o token heim');
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, SECRET, function(erro) {
    if (erro) {
      return res.status(403).send('Nope');
    }
  livros.find(function(err, livros){
    if(err) { 
      res.status(500).send({ message: err.message })
    }
    res.status(200).send(livros);
  })
});
};

const getByTitulo = (req, res) => {
  const authHeader = req.get('authorization');

  if (!authHeader) {
    return res.status(401).send('Tô de Olho! Cadê o token heim');
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, SECRET, function(erro) {
    if (erro) {
      return res.status(403).send('Nope');
    }
  const parametros = req.query;
  livros.find(parametros, function (err, livros) {
    if (err) {
        res.status(500).send({ message: err.message })
    } else {
        res.status(200).send(livros)
    }
})
});
}

const postLivros = (req,res)=>{
  const authHeader = req.get('authorization');

  if (!authHeader) {
    return res.status(401).send('Tô de Olho! Cadê o token heim');
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, SECRET, function(erro) {
    if (erro) {
      return res.status(403).send('Nope');
    }
  console.log(req.body);

  let livro = new livros(req.body)

livro.save(function(err){
  if(err) { 
    res.status(500).send({ message: err.message })
  }
  res.status(201).send("O livro foi incluído com sucesso")
})
});
};

const deleteLivros = (req,res)=>{
  const authHeader = req.get('authorization');

  if (!authHeader) {
    return res.status(401).send('Tô de Olho! Cadê o token heim');
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, SECRET, function(erro) {
    if (erro) {
      return res.status(403).send('Nope');
    }
  const id = req.params.id
  livros.deleteMany({ id }, function(err){
      if (err) {
          res.status(500).send({ message: err.message })
      } else {
          res.status(200).send({ message : "O livro foi removido com sucesso"})
      }
  })
});
}

const putLivros = (req,res) => {
  const authHeader = req.get('authorization');

  if (!authHeader) {
    return res.status(401).send('Tô de Olho! Cadê o token heim');
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, SECRET, function(erro) {
    if (erro) {
      return res.status(403).send('Nope');
    }
  const id = req.params.id
  livros.updateMany({ id }, { $set : req.body }, { upsert : true }, function(err){
      if (err) {
          res.status(500).send({ message: err.message })
      } else {
          res.status(200).send({ message : "Livros atualizado com sucesso"})
      }
  })
});
}


module.exports = {
    getAll,
    getByTitulo,
    postLivros,
    deleteLivros,
    putLivros,
};