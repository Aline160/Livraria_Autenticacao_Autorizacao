const funcionarios= require ("../model/funcionarios");

const getAll = (req,res) => {
    console.log (req.url);
    funcionarios.find(function(err, funcionarios){
      if(err) { 
        res.status(500).send({ message: err.message })
      }
      res.status(200).send(funcionarios);
    })
  };

  const getByCpf = (req, res) => {
    const cpf = req.params.cpf;
      funcionarios.findOne({cpf},function(err,funcionarios){
          res.status(200).send(funcionarios);
      })
};

const postFuncionarios = (req,res)=>{
    console.log(req.body);

    let funcionario = new funcionarios(req.body)

  funcionario.save(function(err){
    if(err) { 
      res.status(500).send({ message: err.message })
    }
    res.status(201).send("O funcionario foi incluído com sucesso")
  })
  
};

  const deleteFuncionario = (req,res)=>{
    const id = req.params.id
    funcionarios.deleteMany({ id }, function(err){
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            res.status(200).send({ message : "funcionario removido com sucesso"})
        }
    })
  }

  const putFuncionarios = (req,res) => {
    const id = req.params.id
    funcionarios.updateMany({ id }, { $set : req.body }, { upsert : true }, function(err){
        if (err) {
            res.status(500).send({ message: err.message })
        } else {
            res.status(200).send({ message : "funcionarios atualizado com sucesso"})
        }
    })
}

module.exports = {
    getAll,
    getByCpf,
    postFuncionarios,
    deleteFuncionario,
    putFuncionarios
};