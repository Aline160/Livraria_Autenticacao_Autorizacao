const mongoose = require ('mongoose');

//estrutura do seu model (atributos da sua entidade)
const livrosSchema = new mongoose.Schema({
    
    id:{type:Number},
    titulo:{ type : String},
    autor:{ type : String},
    ano:{ type: Number },
    genero:{ type : String},
    comprado:{type: Boolean},
    preco:{type:String},

},{
    //gera por padrão uma versão para cada atualização do documento
    versionKey: false
});

// atribuindo o esquema a uma collection
// estou definindo o nome da collection que irei salvar no banco
const livros = mongoose.model('livros', livrosSchema);

// exportar o model para ser utilizado
module.exports = livros;