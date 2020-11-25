const funcionarios= require ("../model/funcionarios");
const SECRET= process.env.SECRET;
const jwt= require('jsonwebtoken');
const bcrypt = require('bcrypt');


const create = (req,res)=>{
  const senhaComHash = bcrypt.hashSync(req. body.senha,10);
  req.body.senha = senhaComHash;
  const funcionario = new funcionarios(req.body);
  
  funcionario.save(function(err) {
    if(err){
      res.status(500).send ({message: err.message})
    }
    res.status(201).send(funcionario)
  })
};



const getAll = (req,res) => {

     funcionarios.find(function(err, funcionarios){
      if(err) { 
        return res.status(500).send({ message: err.message })
      }
     return res.status(200).send(funcionarios);
   });
  }

  const login = (req,res) => {
    funcionarios.findOne ({email:req.body.email},function(error,funcionario){
      if (!funcionario) {
        return res.status(404).send(`Não existe funcionario com o email ${req.body.email}`);
      }
  
      const senhaValida = bcrypt.compareSync(req.body.senha, funcionario.senha);
  
      if (senhaValida) {
        const token = jwt.sign({ email: req.body.email }, SECRET);
      //const token = jwt.sign({ email: req.body.email }, SECRET,{expires_in:6000});
        return res.status(200).send(token);
      } else
      return res.status(403).send('Senha invalida');
    });
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
    create,
    getAll,
    login,
    getByCpf,
    postFuncionarios,
    deleteFuncionario,
    putFuncionarios
};