const mongoose = require ('mongoose');

//estrutura do seu model (atributos da sua entidade)
const funcionariosSchema = new mongoose.Schema({
    id:{type:Number},
    nome : { type : String},
    email: { type: String },
    senha: {type:String},
    cpf: { type: Number },
    dataNascimento: { type: String },
    estadoCivil: { type: String },
    telefone: {type:Number},
},{
    //gera por padrão uma versão para cada atualização do documento
    versionKey: false
});

// atribuindo o esquema a uma collection
// estou definindo o nome da collection que irei salvar no banco
const funcionarios = mongoose.model('funcionarios', funcionariosSchema);

// exportar o model para ser utilizado
module.exports = funcionarios;